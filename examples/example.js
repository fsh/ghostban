$(function() {

  let examples = [
    `
(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[sd][qd][pc][pa]CR[qb]SQ[rb]MA[rc]TR[qc](;W[rb](;B[sb](;W[ra])(;W[sa];B[ra]))(;B[rc])(;B[qb])(;B[ra]))(;W[qb];B[rb]CR[rc]MA[ra]TR[sb](;W[ra])(;W[sb];B[rc]C[RIGHT])(;W[rc]C[RIGHT]))(;W[rc]CR[oa]MA[ob](;B[rb])(;B[qb])(;B[sb])(;B[qa]C[CHOICEFORCE];W[rd](;B[re])(;B[qb])(;B[rb])(;B[sb]))(;B[ra];W[rd](;B[re]C[CHOICE])(;B[qb])(;B[sb]))(;B[sa](;W[rd]C[NOTTHIS];B[re])(;W[ra];B[rb]C[CHOICE])))(;W[qc](;B[rc]C[CHOICE];W[qb])(;B[qb]C[CHOICE];W[rc]C[RIGHT])))
`,

    `(;AW[hh]AW[lh]AW[hi]AW[ji]AW[li]AW[lj]AB[kg]AB[lg]AB[mg]AB[mh]AB[mi]AB[mj]AB[kk]AB[lk]AB[mk]C[Black to play and catch the three (ddfsdfsdf)) stones.]SZ[19]GM[1]FF[4]CA[UTF-8]AP[CGoban:2]ST[2]RU[Japanese]KM[0.00]TM[]DT[1999-07-28]SY[Cgoban 1.9.2] (;B[ki] (;W[kh] (;B[jh];W[kj];B[jj];W[ki];B[ii]C[CHOICERIGHT]) (;B[kj];W[jh])) (;W[kj] (;B[kh];W[jj]) (;B[jj];W[kh];B[jh]))) (;B[jh];W[jj]) (;B[jj];W[jh]) (;B[ii];W[jj]))`,
    `(;AW[pe]AW[pf]AW[qg]AW[qh]AW[oi]AW[ri]AW[oj]AW[pj]AW[rj]AW[sk]AW[rl]AW[sl]AW[rm]AB[pg]AB[ph]AB[rh]AB[pi]AB[qi]AB[qj]AB[pk]AB[qk]AB[rk]AB[pl]C[black to do something effective (on) the side]SZ[19]GM[1]FF[3]RU[Japanese]HA[0]KM[5.5]PW[White]PB[Black]GN[White (W) vs. Black (B)]DT[1999-07-27]SY[Cgoban 1.9.2]TM[30:00(5x1:00)] (;B[sh] (;W[sj] (;B[qf];W[rg];B[rf]C[RIGHT]) (;B[rg];W[qf])) (;W[rg];B[sj];W[si];B[sj]C[snapbackRIGHT])) (;B[sj];W[si] (;B[sh];W[sj] (;B[qf];W[rg]) (;B[rg];W[qf])) (;B[qf];W[rg]) (;B[rg];W[qf])) (;B[rg];W[qf]C[black has nothing now]) (;B[qf];W[rg] (;B[sh];W[sg]) (;B[rf];W[sh])) (;B[sj]) (;B[qn];W[rg]) (;B[qm];W[rg]) (;B[rn];W[rg]) (;B[rf];W[rg]) (;B[sg];W[rg]))`,
    `(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.0]KM[6.5]SZ[19]DT[2022-11-10]AE[cq][dp]AB[cp][bo][bq][ap][dq][ep][fp][go][ho][hp][hq]AW[gp][gq][fq][fo][gm][el][cl][co][bn][hr][ir][iq]TR[fo](;B[fn];W[eo](;B[dn](;W[do]C[CHOICE](;B[cn];W[en];B[em]C[RIGHT])(;B[en];W[cn]))(;W[en]C[CHOICE](;B[em];W[do];B[cn]C[RIGHT\r\n])(;B[do];W[em])))(;B[en];W[do](;B[dn];W[cn])(;B[cn];W[dn]))(;B[cn];W[en]))(;B[en];W[fn])(;B[eo];W[fn])(;B[fm];W[en](;B[em];W[dn])(;B[fn];W[eo])(;B[eo];W[fn]))(;B[em];W[fn])(;B[dn];W[fn])(;B[do];W[fn])(;B[gn];W[fn])(;B[dm];W[fn])(;B[cn];W[fn]C[aaaaa:)]))`,
    `
(;AW[bp]AW[cp]AW[cr]AW[dr]AB[er]AB[fs]AB[fq]AB[ep]AB[eo]AW[dp]AB[do]AW[co]AB[bo]AB[bn]AB[cn]AB[dm]AB[dq]TR[dq]C[Black has just played the marked move. :) White to live.]AW[ao]AP[goproblems]ST[0]
(;W[bs];B[ar]
(;W[ds];B[bq];W[cq];B[ap]
(;W[aq];B[iq]LB[ip:A]C[Please answer the black ko threat at AFORCE];W[ip];B[ap];W[br];B[an];W[as];B[ao];W[aq]C[Nicely done. :)RIGHT])
(;W[br];B[an];W[as];B[ao];W[aq]C[nice :)RIGHT])
(;W[as]C[NOTTHIS]))
(;W[cq];B[ds];W[aq];B[br]C[oww])
(;W[aq];B[ds]TR[cq]TR[br]C[Dieeeeeed.]))
(;W[cq];B[ds]C[this shape is dead :(])
(;W[ds];B[cq];W[bq];B[bs]C[];W[eq];B[dq]
(;W[br];B[ap]C[dead])
(;W[ap]
(;B[ar]C[CHOICE];W[br]C[Dead in gote. FAIL! (Bent 4 in corner)])
(;B[br]C[CHOICE];W[ar];B[es];W[cq];B[eq]MA[cs]C[No libs :(])))
(;W[ar];B[bs]
(;W[br];B[ap]
(;W[aq];B[cq]C[Nope...])
(;W[cq];B[aq]C[Nuh uh.]))
(;W[cq];B[ds];W[cs];B[ap]C[Why did the chicken cross the road? Because he wanted death by car after his corner died :(])
(;W[ap];B[br]
(;W[bq];B[ds]C[woops])
(;W[cq];B[ds];W[cs];B[bq]C[Life? Seki? no. Just dead.])))
(;W[ap];B[br]
(;W[bs];B[ar]
(;W[ds];B[cq];W[bq];B[eq]MA[aq]C[Uh oh, can't approach ])
(;W[cq];B[ds]C[No good!]))
(;W[ar];B[bs]
(;W[bq];B[ds]C[Dieeeeeeee])
(;W[cq];B[ds];W[cs];B[bq]C[It's not seki. You're still dead. Accept it!]))
(;W[cq];B[ds]C[dead])
(;W[ds];B[cq];W[bq];B[eq]
(;W[bs];B[ar]MA[aq]C[]MA[as])
(;W[ar];B[bs]MA[cs]MA[as]C[:(])))
(;W[br];B[cq];W[bq];B[ds];W[cs];B[ap]C[nope.:)]))
`,
    `(;GM[1]FF[4]CA[UTF-8]AP[CGoban:2]ST[2]
RU[Japanese]SZ[9]KM[0.00]
PW[White]PB[Black]SQ[aa]CR[ab]MA[ac]AW[dc][dd][ed][fd][gd][hd][id][ge][ff][fg][hg][fh][fi]AB[cb][cc][cd][ae][be][de][ee][cf][ef][dg][bh][dh][di]LB[da:K][ea:S][fa:L][db:P][eb:I]C[No komi, no prisoners yet - Black to win.]PL[B]
(;B[fa]CR[fa]
(;W[ga]CR[ga]
(;B[fb]CR[fb]
(;W[db]CR[db]
;B[da]CR[da]
(;W[gb]CR[gb]
;B[fc]CR[fc]
(;W[gc]CR[gc]
(;B[ea]CR[ea]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.])
(;B[ca]CR[ca]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.]))
(;W[eb]CR[eb]
;B[ea]CR[ea]
;W[gc]CR[gc]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.]))
(;W[eb]CR[eb]
;B[ea]CR[ea]
;W[gb]CR[gb]
;B[fc]CR[fc]
;W[gc]CR[gc]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.]))
(;W[eb]CR[eb]
;B[ea]CR[ea]
;W[db]CR[db]
;B[da]CR[da]
;W[gb]CR[gb]
;B[fc]CR[fc]
;W[gc]CR[gc]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.]))
(;B[da]CR[da]
;W[fb]CR[fb]
;B[ea]CR[ea]
;W[gb]CR[gb]
;B[eb]CR[eb]
;W[ec]CR[ec]
;B[db]CR[db]C[Jigo])
(;B[ea]CR[ea]
(;W[fb]CR[fb]
(;B[da]CR[da]
;W[gb]CR[gb]
;B[eb]CR[eb]
;W[ec]CR[ec]
;B[db]CR[db]C[Jigo])
(;B[db]CR[db]
;W[eb]CR[eb]
;B[da]CR[da]
;W[gb]CR[gb]C[W +1])
(;B[eb]CR[eb]
;W[db]CR[db]
(;B[da]CR[da]
;W[ec]CR[ec]
;B[ca]CR[ca]
;W[gb]CR[gb]C[W +1])
(;B[gb]CR[gb]
;W[da]CR[da]
(;B[ha]CR[ha]
;W[ib]CR[ib]
;B[fc]CR[fc]
;W[hb]CR[hb]C[B dies.])
(;B[fc]CR[fc]
;W[hb]CR[hb]
;B[ha]CR[ha]
;W[hc]CR[hc]C[B dies.])))
(;B[gb]CR[gb]
;W[da]CR[da]
;B[eb]CR[eb]
;W[db]CR[db]
(;B[ha]CR[ha]
;W[ib]CR[ib]
;B[fc]CR[fc]
;W[hb]CR[hb]C[B dies.])
(;B[fc]CR[fc]
;W[hb]CR[hb]
;B[ha]CR[ha]
;W[hc]CR[hc]C[B dies.])))
(;W[db]CR[db]
;B[da]CR[da]
;W[gb]CR[gb]
;B[fb]CR[fb]
;W[fc]CR[fc]
;B[eb]CR[eb]C[Jigo])
(;W[gb]CR[gb]C[Bad for W]
;B[db]CR[db]
;W[fb]CR[fb]
;B[eb]CR[eb]
;W[ec]CR[ec]C[B +1]))
(;B[eb]CR[eb]
;W[db]CR[db]
;B[da]CR[da]
;W[fb]CR[fb]
;B[ea]CR[ea]
;W[ec]CR[ec]
;B[ca]CR[ca]
;W[gb]CR[gb]C[W +1])
(;B[gb]CR[gb]
;W[ea]CR[ea]
;B[eb]CR[eb]
;W[fb]CR[fb]
;B[fc]CR[fc]
;W[db]CR[db]
;B[fa]CR[fa]
;W[da]CR[da]C[B dies.]))
(;W[eb]CR[eb]
;B[ea]CR[ea]
(;W[gb]CR[gb]
(;B[ga]CR[ga]
;W[da]CR[da]
;B[db]CR[db]
;W[ha]CR[ha]
;B[ca]CR[ca]
;W[fb]CR[fb]
;B[da]CR[da]
;W[hb]CR[hb]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.])
(;B[db]CR[db]
;W[fb]CR[fb]
;B[ga]CR[ga]
;W[ha]CR[ha]
;B[da]CR[da]
;W[hb]CR[hb]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.])
(;B[da]CR[da]
;W[ga]CR[ga]
;B[fb]CR[fb]
;W[fc]CR[fc]
;B[db]CR[db]
;W[ec]CR[ec]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.])
(;B[fb]CR[fb]
;W[db]CR[db]
;B[da]CR[da]
;W[fc]CR[fc]
;B[ga]CR[ga]
;W[ha]CR[ha]
;B[ca]CR[ca]
;W[hb]CR[hb]C[RIGHT You won by 1. When Black has no large ko threats, and the value of sente is worth less than 2, a large monkey
jump is the best 1st move. For values of sente greater than 2 (again when B has no large ko threats), lmj & the 1 space jump give the same result.]))
(;W[da]CR[da]C[Bad for W]
;B[db]CR[db]
;W[fb]CR[fb]
;B[ga]CR[ga]
(;W[hb]CR[hb]
(;B[ha]CR[ha]
;W[gb]CR[gb]
;B[ca]CR[ca]
;W[ib]CR[ib]C[B +3])
(;B[gb]CR[gb]
;W[gc]CR[gc]
;B[ca]CR[ca]
;W[ha]CR[ha]
;B[da]CR[da]C[B +2]))
(;W[ha]CR[ha]C[Bad for W]
(;B[gb]CR[gb]
;W[hb]CR[hb]
;B[gc]CR[gc]
;W[hc]CR[hc]
;B[ca]CR[ca]
;W[fc]CR[fc]
;B[da]CR[da]C[B +4])
(;B[ca]CR[ca]
;W[gb]CR[gb]
;B[da]CR[da]
;W[hb]CR[hb]C[B +1])))))
(;B[da]CR[da]
;W[fb]CR[fb]
(;B[fa]CR[fa]
;W[ga]CR[ga]
(;B[ea]CR[ea]
;W[gb]CR[gb]
;B[eb]CR[eb]
;W[ec]CR[ec]
;B[db]CR[db]C[Jigo])
(;B[eb]CR[eb]
;W[ea]CR[ea]
(;B[db]CR[db]
;W[fa]CR[fa]
;B[ec]CR[ec]
;W[fc]CR[fc]C[W +1])
(;B[ec]CR[ec]
;W[db]CR[db]
(;B[ca]CR[ca]
;W[fc]CR[fc]C[W +7])
(;B[fa]CR[fa]
;W[fc]CR[fc]
;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7]))))
(;B[eb]CR[eb]
;W[fa]CR[fa]
;B[ec]CR[ec]
;W[fc]CR[fc]
;B[db]CR[db]C[W +1]))
(;B[ea]CR[ea]
;W[fb]CR[fb]
(;B[fa]CR[fa]
;W[ga]CR[ga]
(;B[da]CR[da]
;W[gb]CR[gb]
;B[eb]CR[eb]
;W[ec]CR[ec]
;B[db]CR[db]C[Jigo])
(;B[eb]CR[eb]
;W[db]CR[db]
(;B[da]CR[da]
;W[ec]CR[ec]
;B[ca]CR[ca]
;W[gb]CR[gb]C[W +1])
(;B[gb]CR[gb]
;W[da]CR[da]
;B[ha]CR[ha]
;W[ib]CR[ib]
;B[fc]CR[fc]
;W[hb]CR[hb]C[B dies.]))
(;B[db]CR[db]
;W[eb]CR[eb]
;B[da]CR[da]
;W[gb]CR[gb]C[W +1])
(;B[gb]CR[gb]
;W[da]CR[da]
(;B[eb]CR[eb]
;W[db]CR[db]
;B[ha]CR[ha]
;W[ib]CR[ib]
;B[fc]CR[fc]
;W[hb]CR[hb]C[B dies.])
(;B[ha]CR[ha]
;W[eb]CR[eb]
;B[ib]CR[ib]
;W[ga]CR[ga]
;B[hc]CR[hc]
;W[fa]CR[fa]C[B dies.])))
(;B[eb]CR[eb]
;W[db]CR[db]
;B[da]CR[da]
;W[fa]CR[fa]
;B[ec]CR[ec]
;W[fc]CR[fc]
;B[ca]CR[ca]C[W +2]))
(;B[eb]CR[eb]
;W[db]CR[db]
;B[da]CR[da]
;W[fb]CR[fb]
(;B[fa]CR[fa]
(;W[ga]CR[ga]
(;B[ea]CR[ea]
;W[ec]CR[ec]
;B[ca]CR[ca]
;W[gb]CR[gb]C[W +1])
(;B[ec]CR[ec]
;W[fc]CR[fc]
;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7])
(;B[gb]CR[gb]
;W[ea]CR[ea]
;B[ca]CR[ca]
;W[ec]CR[ec]C[W +7]))
(;W[gb]CR[gb]C[As W can win the ko, wG9 is 2 points better.]
(;B[ga]CR[ga]
;W[ha]CR[ha]
(;B[ea]CR[ea]
;W[ec]CR[ec]
;B[ca]CR[ca]
;W[hb]CR[hb]C[B +1])
(;B[ec]CR[ec]
;W[fc]CR[fc]
;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7]))
(;B[ec]CR[ec]
(;W[ga]CR[ga]
(;B[ea]CR[ea]
;W[fc]CR[fc]
;B[ca]CR[ca]C[Jigo])
(;B[ca]CR[ca]
;W[ea]CR[ea]
;B[]
;W[fc]CR[fc]C[W +6]))
(;W[fc]CR[fc]
;B[ea]CR[ea]
;W[ga]CR[ga]
;B[ca]CR[ca]C[Jigo]))))
(;B[ec]CR[ec]
;W[fa]CR[fa]
;B[ea]CR[ea]
;W[fc]CR[fc]
;B[ca]CR[ca]C[W +2])
(;B[ea]CR[ea]
;W[fa]CR[fa]
;B[ec]CR[ec]
;W[fc]CR[fc]
;B[ca]CR[ca]C[W +2])
(;B[gb]CR[gb]
(;W[fa]CR[fa]
(;B[ea]CR[ea]
;W[ec]CR[ec]
;B[ca]CR[ca]C[W +4])
(;B[fc]CR[fc]
;W[ec]CR[ec]
(;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7])
(;B[ga]CR[ga]
;W[gc]CR[gc]
;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7])))
(;W[ec]CR[ec]
(;B[ea]CR[ea]
;W[fa]CR[fa]
;B[ca]CR[ca]C[W +4])
(;B[fa]CR[fa]
;W[ea]CR[ea]
;B[ca]CR[ca]
;W[ga]CR[ga]C[W +7]))))
(;B[db]CR[db]
;W[eb]CR[eb]
(;B[ea]CR[ea]
;W[fa]CR[fa]
(;B[da]CR[da]
;W[fb]CR[fb]C[W +3])
(;B[fb]CR[fb]
;W[da]CR[da]
;B[ga]CR[ga]
;W[ea]CR[ea]
;B[ca]CR[ca]
;W[ec]CR[ec]C[W +7]))
(;B[fb]CR[fb]
;W[da]CR[da]
;B[ca]CR[ca]
;W[ea]CR[ea]C[W +7])))
`,
    `(;AP[goproblems]AW[bp]AW[cp]AW[cr]AW[dr]AB[er][mk]AB[fq]AB[ep]AB[eo]AW[dp]AB[do]AW[co]AB[bo]AB[bn]AB[cn]AB[dm]AB[dq]AW[ao]TR[dq]SQ[br]SQ[bq]SQ[aq]SQ[ar]SQ[as]SQ[bs]SQ[cs]C[Black has just played the marked move. White to live.];W[bs];B[ar](;W[ds])(;W[cq];B[ds])(;W[aq];B[ds]TR[cq]TR[br]C[Dieeeeeed.]))`,
    `(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]
RU[Japanese]SZ[9]KM[0.00]
PW[White]PB[Black]
;B[fd]
;W[de]
;B[dd]
;W[ce]
;B[cf]
;W[df]
;B[ef]
;W[dg]
;B[eg]
;W[cd]
;B[dc]
;W[cc]
;B[db]
;W[ic]
;B[ie]
;W[ig]
;B[ii])
`,
    `(;GM[1]FF[4]CA[UTF-8]SZ[19]AP[CGoban:3]ST[2]AB[de][fg]AW[dc][fd][he][lk][jl]SQ[hd]SQ[jg]SQ[ej]CR[ca]CR[ea]CR[ga]RU[Japanese]PW[White]PB[Black](;B[fd];W[de](;B[dd];W[ce];B[cf];W[df];B[ef];W[dg];B[eg];W[cd];B[dc];W[cc];B[db];W[ic];B[ie];W[ig];B[ii]CR[fh]CR[hl]CR[ik]CR[dj]CR[gd]CR[kc]CR[ib]CR[fb]CR[lc]CR[kj]LB[ag:A]LB[gi:B]LB[ge:C]LB[ld:D]C[RIGHT])(;B[je];W[jf](;B[ih];W[gj];B[fj])(;B[kd];W[kh];B[hj];W[dj];B[dg]CR[dd]CR[de]CR[hf]CR[hh]CR[gj]CR[hi]LB[bi:A]LB[di:B]LB[fk:C])))(;B[ae];W[cf];B[dh];W[fi];B[ji]))`,
    "(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[jj][ll][lm][ln])",
    "(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[qc][qd][pd][qf][gc][gd][fd][gf])",
    "(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[9]ST[0]AB[qc][qd][pd][qf][cg][cf][ce][ef][fd])",
    "(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[9]ST[0]AB[gc][gd][fd][gf])",
    `(;AP[goproblems]SZ[19]AW[bp][cp][dp][co][cq][dr][cr]AB[bo][bn][dm][cn][do][ep][eq][er][ap]TR[dq]C[Black has just played the marked move. White to live.](;W[bs];B[ar](;W[ds];B[bq];W[cq];B[ap](;W[aq];B[iq]LB[ip:A]C[Please answer the black ko threat at AFORCE];W[ip];B[ap];W[br];B[an];W[as];B[ao];W[aq]C[Nicely done. :)RIGHT])(;W[br];B[an];W[as];B[ao];W[aq]C[nice :)RIGHT])(;W[as]C[NOTTHIS]))(;W[cq];B[ds];W[aq];B[br]C[oww])(;W[aq];B[ds]TR[cq]TR[br]C[Dieeeeeed.]))(;W[cq];B[ds]C[this shape is dead :(])(;W[ds];B[cq];W[bq];B[bs]C[];W[eq];B[dq](;W[br];B[ap]C[deadNOTTHIS])(;W[ap](;B[ar]C[CHOICE];W[br]C[Dead in gote. FAIL! (Bent 4 in corner)])(;B[br]C[CHOICE];W[ar];B[es];W[cq];B[eq]MA[cs]C[No libs :(])))(;W[ar];B[bs](;W[br];B[ap](;W[aq];B[cq]C[Nope...])(;W[cq];B[aq]C[Nuh uh.]))(;W[cq];B[ds];W[cs];B[ap]C[Why did the chicken cross the road? Because he wanted death by car after his corner died :(])(;W[ap];B[br](;W[bq];B[ds]C[woops])(;W[cq];B[ds];W[cs];B[bq]C[Life? Seki? no. Just dead.])))(;W[ap];B[br](;W[bs];B[ar](;W[ds];B[cq];W[bq];B[eq]MA[aq]C[Uh oh, can't approach :(])(;W[cq];B[ds]C[No good!]))(;W[ar];B[bs](;W[bq];B[ds]C[Dieeeeeeee])(;W[cq];B[ds];W[cs];B[bq]C[It's not seki. You're still dead. Accept it!]))(;W[cq];B[ds]C[dead])(;W[ds];B[cq];W[bq];B[eq](;W[bs];B[ar]MA[aq]MA[as]C[:(])(;W[ar];B[bs]MA[cs]MA[as]C[:(])))(;W[br];B[cq];W[bq];B[ds];W[cs];B[ap]C[nope.]))`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[dd])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[kl])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[fd][cc])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[op])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[cl][cj])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[kl][mk][ol])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[dj][fj])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[dj][fj][hj][jj][lj][nj])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[fm][dm][bp])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[cd])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[qc])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[fj][dl])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[jg][ie][ic])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[kn][kp])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems: 0.1.0]SZ[19]ST[0]AB[jd])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[jj])`,
    `(;FF[4]GM[1]CA[UTF-8]AP[goproblems:0.1.0]SZ[19]ST[0]AB[pd][oa][na][ma][la][ka][ia][ja][ha][fa][eb])`
  ];

  let GB = window.ghostban;
  const {
    GhostBan, Sgf, Ki,
    canMove, genMove,
    getPlayerToMove,
    getOrCreateMoveChild,
    posToSgf,
    calcMatAndMarkup, Theme,
    Cursor
  } = GB;

  // Drop down list of `examples`.
  let sbox = $('<select>');
  for (idx in examples) {
    $(`<option>${idx}</option>`).appendTo(sbox);
  }
  sbox.on('change', function(e) {
    console.log("setting sgf", this.value);
    setSgf(examples[this.value]);
  });
  sbox.prependTo('body');

  function setSgf(c) {
    let sgf = new Sgf(c)
    let root = sgf.root;
    window.root = root;
    let currentNode = root;

    console.log("node:", currentNode);
    console.log("player to move:", getPlayerToMove(currentNode));

    let { mat, markup } = calcMatAndMarkup(currentNode, 15)
    let g = new GhostBan({
      boardEdgeLineWidth: 2,
      padding: 35,
      interactive: true,
      coordinate: true,
      // boardLineExtent: 0.5,
      // boardLineExtent: 0.5,
      boardLineExtent: 0.5,
      zoom: true,
      // zoom: false,
      extent: 3,
    });
    window.g = g;
    // markup[0][0] = "sq";
    // markup[0][1] = "sq";
    // markup[0][2] = "ci";
    // markup[0][3] = "tri";
    markup[0][0] = "sq|pos";
    markup[0][1] = "sq|neg";
    markup[0][2] = "ci|neu";
    markup[0][3] = "tri|node";
    // markup[0][18] = "sq|pos";
    // markup[0][17] = "sq|neg";
    // markup[0][16] = "ci|neu";
    // markup[0][15] = "tri|node";

    let dom = document.getElementById('root');
    g.init(dom);
    // g.setBoardSize(9);
    g.setMat(mat);
    g.setMarkup(markup);
    // g.setCursor(Cursor.Circle)
    // g.setCursor(Cursor.Square)
    // g.setCursor(Cursor.Cross)
    // g.setCursor(Cursor.Triangle)
    // g.setCursor(Cursor.Text, "B")
    // g.setCursor(Cursor.BlackStone)
    // g.setBoardSize(9);

    const ki = getPlayerToMove(currentNode);
    g.setCursor(ki === Ki.Black ? Cursor.BlackStone : Cursor.WhiteStone);
    g.setTurn(ki);

    // g.calcBoardVisibleArea(true);
    g.setTheme(Theme.Flat)
    g.render();
    g.resize();


    dom.onclick = () => {
      i = g.cursorPosition[0];
      j = g.cursorPosition[1];

      console.log('current:', currentNode, currentNode.model.id);

      const turn = getPlayerToMove(currentNode);
      if (!canMove(mat, i, j, turn)) {
        console.log('warning: invalid move?', i, j, turn);
        // Invalid move. Do nothing.
        return;
      }

      const movestr = posToSgf(i, j, turn);
      currentNode = getOrCreateMoveChild(currentNode, movestr);

      console.log('after move:', currentNode, currentNode.model.id);

      let res = calcMatAndMarkup(currentNode)
      g.setMat(res.mat);
      g.setMarkup(res.markup);

      g.render();
      g.renderInteractive();

      let nextNode = genMove(currentNode,
        (path) => { console.log('right', path); },
        (path) => { console.log('wrong', path); },
        (path) => { console.log('variant', path); },
        (path) => { console.log('offpath', path); }
      );

      if (nextNode) {
        currentNode = nextNode;
        console.log('response:', currentNode, currentNode.model.id);

        const ki = getPlayerToMove(currentNode);
        g.setCursor(ki === Ki.Black ? Cursor.BlackStone : Cursor.WhiteStone);
        g.setTurn(ki);

        let res = GB.calcMatAndMarkup(currentNode);
        g.setMat(res.mat);
        g.setMarkup(res.markup);
        g.render();
        g.renderInteractive();

      }
    }
  }


  setSgf(examples[0]);
});
