import {compact} from 'lodash';
import {calcVisibleArea, reverseOffset, zeros, empty, a1ToPos} from './helper';
import {
  A1_LETTERS,
  A1_NUMBERS,
  DEFAULT_OPTIONS,
  MAX_BOARD_SIZE,
  THEME_RESOURCES,
} from './const';
import {
  Cursor,
  Markup,
  Theme,
  Ki,
  Analysis,
  GhostBanOptions,
  GhostBanOptionsParams,
  Center,
} from './types';

import {ImageStone, ColorStone} from './stones';
import AnalysisPoint from './stones/AnalysisPoint';
// import {create, meanDependencies, stdDependencies} from 'mathjs';

// const config = {};
// const {std, mean} = create({meanDependencies, stdDependencies}, config);

import {
  CircleMarkup,
  CrossMarkup,
  TextMarkup,
  SquareMarkup,
  TriangleMarkup,
  NodeMarkup,
  PositiveNodeMarkup,
  CircleSolidMarkup,
} from './markups';

const images: {
  [key: string]: HTMLImageElement;
} = {};

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function preload(urls: string[], done: () => void) {
  let loaded = 0;
  const imageLoaded = () => {
    loaded++;
    if (loaded === urls.length) {
      done();
    }
  };
  for (let i = 0; i < urls.length; i++) {
    if (!images[urls[i]]) {
      images[urls[i]] = new Image();
      images[urls[i]].src = urls[i];
      images[urls[i]].onload = function () {
        imageLoaded();
      };
      images[urls[i]].onerror = function () {
        imageLoaded();
      };
    }
  }
}

let dpr = 1.0;
// browser code
if (typeof window !== 'undefined') {
  dpr = window.devicePixelRatio || 1.0;
}

export class GhostBan {
  defaultOptions: GhostBanOptions = {
    boardSize: 19,
    dynamicPadding: false,
    padding: 10,
    extent: 3,
    interactive: false,
    coordinate: true,
    theme: Theme.BlackAndWhite,
    background: false,
    showAnalysis: false,
    boardEdgeLineWidth: 5,
    boardLineWidth: 1,
    boardLineExtent: 0.5,
    themeFlatBoardColor: '#ECB55A',
    positiveNodeColor: '#4d7c0f',
    negativeNodeColor: '#b91c1c',
    neutralNodeColor: '#a16207',
    defaultNodeColor: '#404040',
    themeResources: THEME_RESOURCES,
    moveSound: false,
    starSize: 3,
  };
  options: GhostBanOptions;
  dom: HTMLElement | undefined;
  canvas?: HTMLCanvasElement;
  board?: HTMLCanvasElement;
  analysisCanvas?: HTMLCanvasElement;
  cursorCanvas?: HTMLCanvasElement;
  markupCanvas?: HTMLCanvasElement;
  moveSoundAudio?: HTMLAudioElement;
  turn: Ki;
  private cursor: Cursor = Cursor.None;
  private cursorValue: string = '';
  private touchMoving = false;
  private touchStartPoint: DOMPoint = new DOMPoint();
  public cursorPosition: [number, number];
  public cursorPoint: DOMPoint = new DOMPoint();
  public mat: number[][];
  public markup: string[][];
  public visibleAreaMat: number[][];
  maxhv: number;
  transMat: DOMMatrix;
  analysis: Analysis | null;
  visibleArea: number[][];

  constructor(options: GhostBanOptionsParams = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    };
    const size = this.options.boardSize;
    this.mat = zeros([size, size]);
    this.visibleAreaMat = zeros([size, size]);
    this.markup = empty([size, size]);
    this.turn = Ki.Black;
    this.cursorPosition = [size - 1, 0];
    this.maxhv = size;
    this.transMat = new DOMMatrix();
    this.analysis = null;
    this.visibleArea = [
      [0, size - 1],
      [0, size - 1],
    ];
  }

  setTurn(turn: Ki) {
    this.turn = turn;
  }

  setBoardSize(size: number) {
    this.options.boardSize = Math.min(size, MAX_BOARD_SIZE);
  }

  resize() {
    if (
      !this.canvas ||
      !this.cursorCanvas ||
      !this.dom ||
      !this.board ||
      !this.markupCanvas ||
      !this.analysisCanvas
    )
      return;
    const {board, canvas, markupCanvas, cursorCanvas, analysisCanvas} = this;
    const {size, zoom} = this.options;
    if (size) {
      board.width = size * dpr;
      board.height = size * dpr;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      markupCanvas.width = size * dpr;
      markupCanvas.height = size * dpr;
      cursorCanvas.width = size * dpr;
      cursorCanvas.height = size * dpr;
      analysisCanvas.width = size * dpr;
      analysisCanvas.height = size * dpr;
    } else {
      const {clientWidth} = this.dom;
      board.style.width = clientWidth + 'px';
      board.style.height = clientWidth + 'px';
      board.width = Math.floor(clientWidth * dpr);
      board.height = Math.floor(clientWidth * dpr);
      canvas.style.width = clientWidth + 'px';
      canvas.style.height = clientWidth + 'px';
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientWidth * dpr);
      markupCanvas.style.width = clientWidth + 'px';
      markupCanvas.style.height = clientWidth + 'px';
      markupCanvas.width = Math.floor(clientWidth * dpr);
      markupCanvas.height = Math.floor(clientWidth * dpr);
      cursorCanvas.style.width = clientWidth + 'px';
      cursorCanvas.style.height = clientWidth + 'px';
      cursorCanvas.width = Math.floor(clientWidth * dpr);
      cursorCanvas.height = Math.floor(clientWidth * dpr);
      analysisCanvas.style.width = clientWidth + 'px';
      analysisCanvas.style.height = clientWidth + 'px';
      analysisCanvas.width = Math.floor(clientWidth * dpr);
      analysisCanvas.height = Math.floor(clientWidth * dpr);
    }

    this.render();
  }

  init(dom: HTMLElement) {
    const size = this.options.boardSize;
    this.mat = zeros([size, size]);
    this.markup = empty([size, size]);
    this.transMat = new DOMMatrix();

    const board = document.createElement('canvas');
    board.style.position = 'absolute';
    board.id = 'ghostban-board';
    this.board = board;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.id = 'ghostban-canvas';
    this.canvas = canvas;

    const markupCanvas = document.createElement('canvas');
    markupCanvas.style.position = 'absolute';
    markupCanvas.id = 'ghostban-markup';
    markupCanvas.style.pointerEvents = 'none';
    this.markupCanvas = markupCanvas;

    const cursorCanvas = document.createElement('canvas');
    cursorCanvas.style.position = 'absolute';
    cursorCanvas.id = 'ghostban-cursor';
    this.cursorCanvas = cursorCanvas;

    const analysisCanvas = document.createElement('canvas');
    analysisCanvas.style.position = 'absolute';
    analysisCanvas.style.pointerEvents = 'none';
    analysisCanvas.id = 'ghostban-analysis';
    this.analysisCanvas = analysisCanvas;

    this.dom = dom;

    dom.firstChild?.remove();
    dom.firstChild?.remove();
    dom.firstChild?.remove();
    dom.firstChild?.remove();
    dom.firstChild?.remove();

    dom.appendChild(board);
    dom.appendChild(canvas);
    dom.appendChild(markupCanvas);
    dom.appendChild(analysisCanvas);
    dom.appendChild(cursorCanvas);

    this.resize();
    this.renderInteractive();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.resize();
      });
    }
  }

  setOptions(options: GhostBanOptionsParams) {
    this.options = {...this.options, ...options};
    // The onMouseMove event needs to be re-added after the options are updated
    this.renderInteractive();
    this.render();
  }

  setMat(mat: number[][]) {
    this.mat = mat;
    this.visibleAreaMat = mat;
  }

  setVisibleAreaMat(mat: number[][]) {
    this.visibleAreaMat = mat;
  }

  setMarkup(markup: string[][]) {
    this.markup = markup;
  }

  setCursor(cursor: Cursor, value = '') {
    this.cursor = cursor;
    this.cursorValue = value;
  }

  setCursorWithRender = (domPoint: DOMPoint, offsetY = 0) => {
    // space need recalculate every time
    const {padding} = this.options;
    const {space} = this.calcSpaceAndPadding();
    const point = this.transMat.inverse().transformPoint(domPoint);
    const idx = Math.round((point.x - padding + space / 2) / space);
    const idy = Math.round((point.y - padding + space / 2) / space) + offsetY;
    const xx = idx * space;
    const yy = idy * space;
    const p = this.transMat.transformPoint(new DOMPoint(xx, yy));
    if (
      !isMobileDevice() ||
      (isMobileDevice() && this.mat[idx - 1][idy - 1] === 0)
    ) {
      this.cursorPoint = p;
      this.cursorPosition = [idx - 1, idy - 1];
    }
    this.drawCursor();

    if (isMobileDevice()) this.drawBoard();
  };

  private onMouseMove = (e: MouseEvent) => {
    const canvas = this.cursorCanvas;
    if (!canvas) return;

    e.preventDefault();
    const point = new DOMPoint(e.offsetX * dpr, e.offsetY * dpr);
    this.setCursorWithRender(point);
  };

  private calcTouchPoint = (e: TouchEvent) => {
    let point = new DOMPoint();
    const canvas = this.cursorCanvas;
    if (!canvas) return point;
    const rect = canvas.getBoundingClientRect();
    const touches = e.changedTouches;
    point = new DOMPoint(
      (touches[0].clientX - rect.left) * dpr,
      (touches[0].clientY - rect.top) * dpr
    );
    return point;
  };

  private onTouchStart = (e: TouchEvent) => {
    const canvas = this.cursorCanvas;
    if (!canvas) return;

    e.preventDefault();
    this.touchMoving = true;
    const point = this.calcTouchPoint(e);
    this.touchStartPoint = point;
    this.setCursorWithRender(point);
  };

  private onTouchMove = (e: TouchEvent) => {
    const canvas = this.cursorCanvas;
    if (!canvas) return;

    e.preventDefault();
    this.touchMoving = true;
    const point = this.calcTouchPoint(e);
    let offset = 0;
    let distance = 10;
    if (
      Math.abs(point.x - this.touchStartPoint.x) > distance ||
      Math.abs(point.y - this.touchStartPoint.y) > distance
    ) {
      offset = -3;
    }
    this.setCursorWithRender(point, offset);
  };

  private onTouchEnd = () => {
    this.touchMoving = false;
  };

  renderInteractive() {
    const canvas = this.cursorCanvas;
    if (!canvas) return;

    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('mouseout', this.onMouseMove);
    canvas.removeEventListener('touchstart', this.onTouchStart);
    canvas.removeEventListener('touchmove', this.onTouchMove);
    canvas.removeEventListener('touchend', this.onTouchEnd);

    if (this.options.interactive) {
      canvas.addEventListener('mousemove', this.onMouseMove);
      canvas.addEventListener('mouseout', this.onMouseMove);
      canvas.addEventListener('touchstart', this.onTouchStart);
      canvas.addEventListener('touchmove', this.onTouchMove);
      canvas.addEventListener('touchend', this.onTouchEnd);
    }

    this.clearCursorCanvas();
  }

  setAnalysis(analysis: Analysis | null) {
    this.analysis = analysis;
    if (!analysis) {
      this.clearAnalysisCanvas();
      return;
    }
    if (this.options.showAnalysis) this.drawAnalysis(analysis);
  }

  setTheme(theme: Theme, options = {}) {
    const {themeResources} = this.options;
    if (!themeResources[theme]) return;
    const {board, blacks, whites} = themeResources[theme];
    this.options.theme = theme;
    this.options = {
      ...this.options,
      theme,
      ...options,
    };
    preload(compact([board, ...blacks, ...whites]), () => {
      this.drawBoard();
      this.render();
    });
    this.drawBoard();
    this.render();
  }

  calcCenter = (): Center => {
    const {visibleArea} = this;
    const {boardSize} = this.options;

    if (
      (visibleArea[0][0] === 0 && visibleArea[0][1] === boardSize - 1) ||
      (visibleArea[1][0] === 0 && visibleArea[1][1] === boardSize - 1)
    ) {
      return Center.Center;
    }

    if (visibleArea[0][0] === 0) {
      if (visibleArea[1][0] === 0) return Center.TopLeft;
      else if (visibleArea[1][1] === boardSize - 1) return Center.BottomLeft;
      else return Center.Left;
    } else if (visibleArea[0][1] === boardSize - 1) {
      if (visibleArea[1][0] === 0) return Center.TopRight;
      else if (visibleArea[1][1] === boardSize - 1) return Center.BottomRight;
      else return Center.Right;
    } else {
      if (visibleArea[1][0] === 0) return Center.Top;
      else if (visibleArea[1][1] === boardSize - 1) return Center.Bottom;
      else return Center.Center;
    }
  };

  calcDynamicPadding(visibleAreaSize: number) {
    const {coordinate} = this.options;
    let padding = 30;
    if (visibleAreaSize <= 3) {
      padding = coordinate ? 120 : 100;
    } else if (visibleAreaSize <= 6) {
      padding = coordinate ? 80 : 60;
    } else if (visibleAreaSize <= 9) {
      padding = coordinate ? 60 : 50;
    } else if (visibleAreaSize <= 12) {
      padding = coordinate ? 50 : 40;
    } else if (visibleAreaSize <= 15) {
      padding = coordinate ? 40 : 30;
    } else if (visibleAreaSize <= 17) {
      padding = coordinate ? 35 : 25;
    } else if (visibleAreaSize <= 19) {
      padding = coordinate ? 30 : 20;
    }
    this.options.padding = padding;
    // this.renderInteractive();
  }

  calcBoardVisibleArea(zoom = false) {
    const {canvas, analysisCanvas, board, cursorCanvas, markupCanvas} = this;
    if (!canvas) return;
    const {boardSize, extent, boardLineExtent, padding, dynamicPadding} =
      this.options;
    const zoomedVisibleArea = calcVisibleArea(
      this.visibleAreaMat,
      extent,
      false
    );
    const ctx = canvas?.getContext('2d');
    const boardCtx = board?.getContext('2d');
    const cursorCtx = cursorCanvas?.getContext('2d');
    const markupCtx = markupCanvas?.getContext('2d');
    const analysisCtx = analysisCanvas?.getContext('2d');
    const visibleArea = zoom
      ? zoomedVisibleArea
      : [
          [0, boardSize - 1],
          [0, boardSize - 1],
        ];

    this.visibleArea = visibleArea;
    const visibleAreaSize = Math.max(
      visibleArea[0][1] - visibleArea[0][0],
      visibleArea[1][1] - visibleArea[1][0]
    );

    if (dynamicPadding) {
      this.calcDynamicPadding(visibleAreaSize);
    } else {
      this.options.padding = DEFAULT_OPTIONS.padding;
    }

    if (zoom) {
      const {space} = this.calcSpaceAndPadding();
      const center = this.calcCenter();

      if (dynamicPadding) {
        this.calcDynamicPadding(visibleAreaSize);
      } else {
        this.options.padding = DEFAULT_OPTIONS.padding;
      }

      let extraVisibleSize = boardLineExtent * 2 + 1;

      if (
        center === Center.TopRight ||
        center === Center.TopLeft ||
        center === Center.BottomRight ||
        center === Center.BottomLeft
      ) {
        extraVisibleSize = boardLineExtent + 0.5;
      }
      let zoomedBoardSize = visibleAreaSize + extraVisibleSize;

      if (zoomedBoardSize < boardSize) {
        let scale = (canvas.width - padding * 2) / (zoomedBoardSize * space);

        let offsetX =
          visibleArea[0][0] * space * scale +
          // for padding
          padding * scale -
          padding -
          // for board line extent
          (space * extraVisibleSize * scale) / 2 +
          (space * scale) / 2;

        let offsetY =
          visibleArea[1][0] * space * scale +
          // for padding
          padding * scale -
          padding -
          // for board line extent
          (space * extraVisibleSize * scale) / 2 +
          (space * scale) / 2;

        this.transMat = new DOMMatrix();
        this.transMat.translateSelf(-offsetX, -offsetY);
        this.transMat.scaleSelf(scale, scale);
        ctx?.setTransform(this.transMat);
        boardCtx?.setTransform(this.transMat);
        analysisCtx?.setTransform(this.transMat);
        cursorCtx?.setTransform(this.transMat);
        markupCtx?.setTransform(this.transMat);
      } else {
        this.resetTransform();
      }
    } else {
      this.resetTransform();
    }
  }

  resetTransform() {
    const {canvas, analysisCanvas, board, cursorCanvas, markupCanvas} = this;
    const ctx = canvas?.getContext('2d');
    const boardCtx = board?.getContext('2d');
    const cursorCtx = cursorCanvas?.getContext('2d');
    const markupCtx = markupCanvas?.getContext('2d');
    const analysisCtx = analysisCanvas?.getContext('2d');
    this.transMat = new DOMMatrix();
    ctx?.resetTransform();
    boardCtx?.resetTransform();
    analysisCtx?.resetTransform();
    cursorCtx?.resetTransform();
    markupCtx?.resetTransform();
  }

  render() {
    const {mat} = this;
    if (this.mat && mat[0]) this.options.boardSize = mat[0].length;

    // TODO: calc visible area twice is not good, need to refactor
    this.calcBoardVisibleArea(this.options.zoom);
    this.calcBoardVisibleArea(this.options.zoom);
    this.clearAllCanvas();
    this.drawBoard();
    this.drawStones();
    this.drawMarkup();
    this.drawCursor();
    if (this.options.showAnalysis) this.drawAnalysis();
  }

  renderInOneCanvas(canvas = this.canvas) {
    this.clearAllCanvas();
    this.drawBoard(canvas, false);
    this.drawStones(this.mat, canvas, false);
    this.drawMarkup(this.mat, this.markup, canvas, false);
  }

  clearAllCanvas = () => {
    this.clearCanvas(this.board);
    this.clearCanvas();
    this.clearCanvas(this.markupCanvas);
    this.clearCursorCanvas();
    this.clearAnalysisCanvas();
  };

  clearBoard = () => {
    if (!this.board) return;
    const ctx = this.board.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Will always clear the right space
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
  };

  clearCanvas = (canvas = this.canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  clearMarkupCanvas = () => {
    if (!this.markupCanvas) return;
    const ctx = this.markupCanvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.markupCanvas.width, this.markupCanvas.height);
      ctx.restore();
    }
  };

  clearCursorCanvas = () => {
    if (!this.cursorCanvas) return;
    const size = this.options.boardSize;
    const ctx = this.cursorCanvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
      ctx.restore();
    }
  };

  clearAnalysisCanvas = () => {
    if (!this.analysisCanvas) return;
    const ctx = this.analysisCanvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(
        0,
        0,
        this.analysisCanvas.width,
        this.analysisCanvas.height
      );
      ctx.restore();
    }
  };

  drawAnalysis = (analysis = this.analysis) => {
    const canvas = this.analysisCanvas;
    const {theme = Theme.BlackAndWhite} = this.options;
    if (!canvas || !analysis) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.clearAnalysisCanvas();
    const {rootInfo} = analysis;

    analysis.moveInfos.forEach(m => {
      if (m.move === 'pass') return;
      const idObj = JSON.parse(analysis.id);
      const {x: ox, y: oy} = reverseOffset(this.mat, idObj.bx, idObj.by);
      let {x: i, y: j} = a1ToPos(m.move);
      i += ox;
      j += oy;
      if (this.mat[i][j] !== 0) return;
      const {space, scaledPadding} = this.calcSpaceAndPadding();
      const x = scaledPadding + i * space;
      const y = scaledPadding + j * space;
      const ratio = 0.46;
      ctx.save();
      if (
        theme !== Theme.Subdued &&
        theme !== Theme.BlackAndWhite &&
        theme !== Theme.Flat
      ) {
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowColor = '#555';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 0;
      }
      const point = new AnalysisPoint(ctx, x, y, space * ratio, rootInfo, m);
      point.draw();
      ctx.restore();
    });
  };

  drawMarkup = (
    mat = this.mat,
    markup = this.markup,
    markupCanvas = this.markupCanvas,
    clear = true
  ) => {
    const canvas = markupCanvas;
    if (canvas) {
      if (clear) this.clearCanvas(canvas);
      for (let i = 0; i < markup.length; i++) {
        for (let j = 0; j < markup[i].length; j++) {
          const values = markup[i][j];
          values?.split('|').forEach(value => {
            if (value !== null && value !== '') {
              const {space, scaledPadding} = this.calcSpaceAndPadding();
              const x = scaledPadding + i * space;
              const y = scaledPadding + j * space;
              const ki = mat[i][j];
              let markup;
              const ctx = canvas.getContext('2d');

              if (ctx) {
                switch (value) {
                  case Markup.Circle: {
                    markup = new CircleMarkup(ctx, x, y, space, ki);
                    break;
                  }
                  case Markup.Current: {
                    markup = new CircleSolidMarkup(ctx, x, y, space, ki);
                    break;
                  }
                  case Markup.PositiveNode: {
                    markup = new PositiveNodeMarkup(
                      ctx,
                      x,
                      y,
                      space,
                      ki,
                      Markup.Circle
                    );
                    markup.setColor(this.options.positiveNodeColor);
                    break;
                  }
                  case Markup.NegativeNode:
                  case Markup.NeutralNode:
                  case Markup.Node: {
                    let color = this.options.defaultNodeColor;
                    if (value === Markup.NegativeNode) {
                      color = this.options.negativeNodeColor;
                    } else if (value === Markup.NeutralNode) {
                      color = this.options.neutralNodeColor;
                    }

                    markup = new NodeMarkup(
                      ctx,
                      x,
                      y,
                      space,
                      ki,
                      Markup.Circle
                    );
                    markup.setColor(color);
                    break;
                  }
                  case Markup.Square: {
                    markup = new SquareMarkup(ctx, x, y, space, ki);
                    break;
                  }
                  case Markup.Triangle: {
                    markup = new TriangleMarkup(ctx, x, y, space, ki);
                    break;
                  }
                  case Markup.Cross: {
                    markup = new CrossMarkup(ctx, x, y, space, ki);
                    break;
                  }
                  default: {
                    if (value !== '') {
                      markup = new TextMarkup(ctx, x, y, space, ki, value);
                    }
                    break;
                  }
                }
                markup?.draw();
              }
            }
          });
        }
      }
    }
  };

  drawBoard = (board = this.board, clear = true) => {
    if (clear) this.clearCanvas(board);
    this.drawBan(board);
    this.drawBoardLine(board);
    this.drawStars(board);
    if (this.options.coordinate) {
      this.drawCoordinate();
    }
  };

  drawBan = (board = this.board) => {
    const {theme, themeResources} = this.options;
    if (board) {
      board.style.borderRadius = '2px';
      const ctx = board.getContext('2d');
      if (ctx) {
        if (theme === Theme.BlackAndWhite) {
          board.style.boxShadow = '0px 0px 0px #000000';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, board.width, board.height);
        } else if (theme === Theme.Flat) {
          ctx.fillStyle = this.options.themeFlatBoardColor;
          ctx.fillRect(0, 0, board.width, board.height);
        } else if (
          theme === Theme.Walnut &&
          themeResources[theme].board !== undefined
        ) {
          const boardUrl = themeResources[theme].board || '';
          const boardRes = images[boardUrl];
          if (boardRes) {
            ctx.drawImage(boardRes, 0, 0, board.width, board.height);
          }
        } else {
          const boardUrl = themeResources[theme].board || '';
          const image = images[boardUrl];
          if (image) {
            const pattern = ctx.createPattern(image, 'repeat');
            if (pattern) {
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, board.width, board.height);
            }
          }
        }
      }
    }
  };

  drawBoardLine = (board = this.board) => {
    if (!board) return;
    const {visibleArea, options} = this;
    const {
      zoom,
      boardSize,
      boardLineWidth,
      boardEdgeLineWidth,
      boardLineExtent,
    } = options;
    const ctx = board.getContext('2d');
    if (ctx) {
      const {space, scaledPadding} = this.calcSpaceAndPadding();

      const extendSpace = zoom ? boardLineExtent * space : 0;

      ctx.fillStyle = '#000000';

      // const mobileScale = 0.5;
      let edgeLineWidth = boardEdgeLineWidth;
      if (!isMobileDevice()) {
        edgeLineWidth *= dpr;
      }
      let lineWidth = boardLineWidth;
      if (!isMobileDevice()) {
        lineWidth *= dpr;
      }
      // vertical
      for (let i = visibleArea[0][0]; i <= visibleArea[0][1]; i++) {
        ctx.beginPath();
        if (
          (visibleArea[0][0] === 0 && i === 0) ||
          (visibleArea[0][1] === boardSize - 1 && i === boardSize - 1)
        ) {
          ctx.lineWidth = edgeLineWidth;
        } else {
          ctx.lineWidth = lineWidth;
        }
        if (
          isMobileDevice() &&
          i === this.cursorPosition[0] &&
          this.touchMoving
        ) {
          ctx.lineWidth = ctx.lineWidth * 2;
        }
        let startPointY =
          scaledPadding + visibleArea[1][0] * space - boardEdgeLineWidth;
        if (isMobileDevice()) {
          startPointY += dpr / 2;
        }
        let endPointY =
          space * visibleArea[1][1] + scaledPadding + boardEdgeLineWidth;
        if (isMobileDevice()) {
          endPointY -= dpr / 2;
        }
        if (visibleArea[1][0] > 0) startPointY -= extendSpace;
        if (visibleArea[1][1] < boardSize - 1) endPointY += extendSpace;
        ctx.moveTo(i * space + scaledPadding, startPointY);
        ctx.lineTo(i * space + scaledPadding, endPointY);
        ctx.stroke();
      }

      // horizontal
      for (let i = visibleArea[1][0]; i <= visibleArea[1][1]; i++) {
        ctx.beginPath();
        if (
          (visibleArea[1][0] === 0 && i === 0) ||
          (visibleArea[1][1] === boardSize - 1 && i === boardSize - 1)
        ) {
          ctx.lineWidth = edgeLineWidth;
        } else {
          ctx.lineWidth = lineWidth;
        }
        if (
          isMobileDevice() &&
          i === this.cursorPosition[1] &&
          this.touchMoving
        ) {
          ctx.lineWidth = ctx.lineWidth * 2;
        }
        let startPointX =
          scaledPadding + visibleArea[0][0] * space - boardEdgeLineWidth;
        let endPointX =
          space * visibleArea[0][1] + scaledPadding + boardEdgeLineWidth;
        if (isMobileDevice()) {
          startPointX += dpr / 2;
        }
        if (isMobileDevice()) {
          endPointX -= dpr / 2;
        }

        if (visibleArea[0][0] > 0) startPointX -= extendSpace;
        if (visibleArea[0][1] < boardSize - 1) endPointX += extendSpace;
        ctx.moveTo(startPointX, i * space + scaledPadding);
        ctx.lineTo(endPointX, i * space + scaledPadding);
        ctx.stroke();
      }
    }
  };

  drawStars = (board = this.board) => {
    if (!board) return;
    if (this.options.boardSize !== 19) return;

    const visibleArea = this.visibleArea;
    const ctx = board.getContext('2d');
    let starSize = this.options.starSize;
    if (!isMobileDevice()) {
      starSize = starSize * dpr;
    }
    if (ctx) {
      const {space, scaledPadding} = this.calcSpaceAndPadding();
      // Drawing star
      ctx.stroke();
      [3, 9, 15].forEach(i => {
        [3, 9, 15].forEach(j => {
          if (
            i >= visibleArea[0][0] &&
            i <= visibleArea[0][1] &&
            j >= visibleArea[1][0] &&
            j <= visibleArea[1][1]
          ) {
            ctx.beginPath();
            ctx.arc(
              i * space + scaledPadding,
              j * space + scaledPadding,
              starSize,
              0,
              2 * Math.PI,
              true
            );
            ctx.fillStyle = 'black';
            ctx.fill();
          }
        });
      });
    }
  };

  drawCoordinate = () => {
    const {board, options, visibleArea} = this;
    if (!board) return;
    const {boardSize, zoom, padding, boardLineExtent} = options;
    let zoomedBoardSize = visibleArea[0][1] - visibleArea[0][0] + 1;
    const ctx = board.getContext('2d');
    const {space, scaledPadding} = this.calcSpaceAndPadding();
    if (ctx) {
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.font = `bold ${space / 2.8}px Helvetica`;

      const center = this.calcCenter();
      let offset = space / 2;

      if (
        center === Center.Center &&
        visibleArea[0][0] === 0 &&
        visibleArea[0][1] === boardSize - 1
      ) {
        offset -= scaledPadding / 2;
      }

      A1_LETTERS.forEach((l, index) => {
        const x = space * index + scaledPadding;
        let offsetTop = offset;
        let offsetBottom = offset;
        if (
          center === Center.TopLeft ||
          center === Center.TopRight ||
          center === Center.Top
        ) {
          offsetTop -= space * boardLineExtent;
        }
        if (
          center === Center.BottomLeft ||
          center === Center.BottomRight ||
          center === Center.Bottom
        ) {
          offsetBottom -= (space * boardLineExtent) / 2;
        }
        let y1 = visibleArea[1][0] * space + padding - offsetTop;
        let y2 = y1 + zoomedBoardSize * space + offsetBottom * 2;
        if (index >= visibleArea[0][0] && index <= visibleArea[0][1]) {
          if (
            center !== Center.BottomLeft &&
            center !== Center.BottomRight &&
            center !== Center.Bottom
          ) {
            ctx.fillText(l, x, y1);
          }

          if (
            center !== Center.TopLeft &&
            center !== Center.TopRight &&
            center !== Center.Top
          ) {
            ctx.fillText(l, x, y2);
          }
        }
      });

      A1_NUMBERS.slice(-this.options.boardSize).forEach((l: number, index) => {
        const y = space * index + scaledPadding;
        let offsetLeft = offset;
        let offsetRight = offset;
        if (
          center === Center.TopLeft ||
          center === Center.BottomLeft ||
          center === Center.Left
        ) {
          offsetLeft -= space * boardLineExtent;
        }
        if (
          center === Center.TopRight ||
          center === Center.BottomRight ||
          center === Center.Right
        ) {
          offsetRight -= (space * boardLineExtent) / 2;
        }
        let x1 = visibleArea[0][0] * space + padding - offsetLeft;
        let x2 = x1 + zoomedBoardSize * space + 2 * offsetRight;
        if (index >= visibleArea[1][0] && index <= visibleArea[1][1]) {
          if (
            center !== Center.TopRight &&
            center !== Center.BottomRight &&
            center !== Center.Right
          ) {
            ctx.fillText(l.toString(), x1, y);
          }
          if (
            center !== Center.TopLeft &&
            center !== Center.BottomLeft &&
            center !== Center.Left
          ) {
            ctx.fillText(l.toString(), x2, y);
          }
        }
      });
    }
  };

  calcSpaceAndPadding = (canvas = this.canvas) => {
    let space = 0;
    let scaledPadding = 0;
    let scaledBoardExtent = 0;
    if (canvas) {
      const {padding, boardSize, boardLineExtent, zoom} = this.options;
      const {visibleArea} = this;

      if (
        (visibleArea[0][0] !== 0 && visibleArea[0][1] === boardSize - 1) ||
        (visibleArea[1][0] !== 0 && visibleArea[1][1] === boardSize - 1)
      ) {
        scaledBoardExtent = boardLineExtent;
      }
      if (
        (visibleArea[0][0] !== 0 && visibleArea[0][1] !== boardSize - 1) ||
        (visibleArea[1][0] !== 0 && visibleArea[1][1] !== boardSize - 1)
      ) {
        scaledBoardExtent = boardLineExtent * 2;
      }

      const divisor = zoom ? boardSize + scaledBoardExtent : boardSize;
      // const divisor = boardSize;
      space = (canvas.width - padding * 2) / Math.ceil(divisor);
      scaledPadding = padding + space / 2;
    }
    return {space, scaledPadding, scaledBoardExtent};
  };

  drawCursor = () => {
    const canvas = this.cursorCanvas;
    if (canvas) {
      this.clearCursorCanvas();
      if (this.cursor === Cursor.None) return;
      if (isMobileDevice() && !this.touchMoving) return;

      const {padding} = this.options;
      const ctx = canvas.getContext('2d');
      const {space} = this.calcSpaceAndPadding();
      const {visibleArea, cursor, cursorValue} = this;

      const [idx, idy] = this.cursorPosition;
      if (idx < visibleArea[0][0] || idx > visibleArea[0][1]) return;
      if (idy < visibleArea[1][0] || idy > visibleArea[1][1]) return;
      // if (this.mat[idx][idy] !== Ki.Empty) return;
      const x = idx * space + space / 2 + padding;
      const y = idy * space + space / 2 + padding;
      const ki = this.mat[idx][idy];

      if (ctx) {
        let cur;
        const size = space * 0.8;
        if (cursor === Cursor.Circle) {
          cur = new CircleMarkup(ctx, x, y, space, ki);
          cur.setGlobalAlpha(0.8);
        } else if (cursor === Cursor.Square) {
          cur = new SquareMarkup(ctx, x, y, space, ki);
          cur.setGlobalAlpha(0.8);
        } else if (cursor === Cursor.Triangle) {
          cur = new TriangleMarkup(ctx, x, y, space, ki);
          cur.setGlobalAlpha(0.8);
        } else if (cursor === Cursor.Cross) {
          cur = new CrossMarkup(ctx, x, y, space, ki);
          cur.setGlobalAlpha(0.8);
        } else if (cursor === Cursor.Text) {
          cur = new TextMarkup(ctx, x, y, space, ki, cursorValue);
          cur.setGlobalAlpha(0.8);
        } else if (ki === Ki.Empty && cursor === Cursor.BlackStone) {
          cur = new ColorStone(ctx, x, y, Ki.Black);
          cur.setSize(size);
          cur.setGlobalAlpha(0.5);
        } else if (ki === Ki.Empty && cursor === Cursor.WhiteStone) {
          cur = new ColorStone(ctx, x, y, Ki.White);
          cur.setSize(size);
          cur.setGlobalAlpha(0.5);
        } else if (cursor === Cursor.Clear) {
          cur = new ColorStone(ctx, x, y, Ki.Empty);
          cur.setSize(size);
        }
        cur?.draw();
      }
    }
  };

  drawStones = (
    mat: number[][] = this.mat,
    canvas = this.canvas,
    clear = true
  ) => {
    const {theme = Theme.BlackAndWhite, themeResources} = this.options;
    if (clear) this.clearCanvas();
    if (canvas) {
      for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
          const value = mat[i][j];
          if (value !== 0) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const {space, scaledPadding} = this.calcSpaceAndPadding();
              const x = scaledPadding + i * space;
              const y = scaledPadding + j * space;

              const ratio = 0.45;
              ctx.save();
              if (
                theme !== Theme.Subdued &&
                theme !== Theme.BlackAndWhite &&
                theme !== Theme.Flat
              ) {
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                ctx.shadowColor = '#555';
                ctx.shadowBlur = 8;
              } else {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
              }
              let stone;
              switch (theme) {
                case Theme.BlackAndWhite:
                case Theme.Flat: {
                  stone = new ColorStone(ctx, x, y, value);
                  stone.setSize(space * ratio * 2);
                  break;
                }
                default: {
                  const blacks = themeResources[theme].blacks.map(
                    i => images[i]
                  );
                  const whites = themeResources[theme].whites.map(
                    i => images[i]
                  );
                  const mod = i + 10 + j;
                  stone = new ImageStone(ctx, x, y, value, mod, blacks, whites);
                  stone.setSize(space * ratio * 2);
                }
              }
              stone.draw();
              ctx.restore();
            }
          }
        }
      }
    }
  };
}
