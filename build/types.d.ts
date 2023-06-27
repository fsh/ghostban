export type GhostBanOptions = {
    boardSize: number;
    size?: number;
    padding: number;
    zoom?: boolean;
    extend: number;
    theme: Theme;
    coordinate: boolean;
    interactive: boolean;
    background: boolean;
};
export type GhostBanOptionsParams = {
    boardSize?: number;
    size?: number;
    padding?: number;
    zoom?: boolean;
    extend?: number;
    theme?: Theme;
    coordinate?: boolean;
    interactive?: boolean;
    background?: boolean;
};
export type ConsumedAnalysis = {
    results: Analysis[];
    params: AnalysisParams | null;
};
export type Analyses = {
    results: Analysis[];
    params: AnalysisParams | null;
};
export type Analysis = {
    id: string;
    isDuringSearch: boolean;
    moveInfos: MoveInfo[];
    rootInfo: RootInfo;
    policy: number[];
    ownership: number[];
    turnNumber: number;
};
export type AnalysisParams = {
    id: string;
    initialPlayer: string;
    moves: any[];
    rules: string;
    komi: string;
    boardXSize: number;
    boardYSize: number;
    includePolicy: boolean;
    priority: number;
    maxVisits: number;
};
export type MoveInfo = {
    isSymmetryOf: string;
    lcb: number;
    move: string;
    order: number;
    prior: number;
    pv: string[];
    scoreLead: number;
    scoreMean: number;
    scoreSelfPlay: number;
    scoreStdev: number;
    utility: number;
    utilityLcb: number;
    visits: number;
    winrate: number;
};
export type RootInfo = {
    currentPlayer: string;
    lcb: number;
    scoreLead: number;
    scoreSelfplay: number;
    scoreStdev: number;
    symHash: string;
    thisHash: string;
    utility: number;
    visits: number;
    winrate: number;
};
export declare enum Ki {
    Black = 1,
    White = -1,
    Empty = 0
}
export declare enum Theme {
    BlackAndWhite = "black-and-white",
    Flat = "flat",
    Subdued = "subdued",
    ShellStone = "shell",
    SlateAndShell = "slate-and-shell",
    Walnut = "walnut",
    Photorealistic = "photorealistic"
}
export declare enum Center {
    TopRight = "tr",
    TopLeft = "tl",
    BottomLeft = "bl",
    BottomRight = "br",
    Center = "c"
}
export declare enum Markup {
    Current = "cu",
    Circle = "ci",
    Square = "sq",
    Triangle = "tri",
    Cross = "cr",
    Number = "num",
    Letter = "le",
    None = ""
}
export declare enum ProblemAnswerType {
    Right = "1",
    Wrong = "2",
    Variant = "3"
}
