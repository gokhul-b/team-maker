export function findCombinations(
  forms,
  conPlayer,
  min_credit,
  max_credit,
  team_size,
  teamAplayers,
  teamBplayers,
  game,
  excludedPlayer,
  subPlayers
) {
  function* combinations(arr, k) {
    for (let i = 0; i < arr.length; i++) {
      if (k === 1) {
        yield [arr[i]];
      } else {
        let subArr = arr.slice(i + 1);
        for (let combo of combinations(subArr, k - 1)) {
          yield [arr[i], ...combo];
        }
      }
    }
  }

  function select_players(groups) {
    let players = [];
    for (let group of groups) {
      players.push(...group);
    }
    let comb = [];
    for (let combi of combinations(players, team_size)) {
      let totalScore = combi.reduce((acc, p) => acc + p[1], 0);
      if (
        totalScore >= parseFloat(min_credit) &&
        totalScore <= parseFloat(max_credit)
      ) {
        comb.push(combi);
      }
    }

    return comb;
  }

  const conPlayers = conPlayer.map(({ name }) => name);

  const excludedPlayers = excludedPlayer.map(({ name }) => name);
  // console.log(excludedPlayers);

  const groups = forms.map(({ formFields }) =>
    formFields.map(
      ({
        name,
        credit,
        points,
        pts,
        reb,
        ast,
        stl,
        block,
        isCaptain,
        isViceCaptain,
      }) => [
        name,
        parseFloat(credit),
        parseFloat(points),
        parseFloat(
          isCaptain
            ? Math.round(pts) * 2
            : isViceCaptain
            ? Math.round(pts) * 1.5
            : Math.round(pts)
        ),
        parseFloat(
          isCaptain
            ? Math.round(reb * 1.2) * 2
            : isViceCaptain
            ? Math.round(reb * 1.2) * 1.5
            : Math.round(reb * 1.2)
        ),
        parseFloat(
          isCaptain
            ? Math.round(ast * 1.5) * 2
            : isViceCaptain
            ? Math.round(ast * 1.5) * 1.5
            : Math.round(ast * 1.5)
        ),
        parseFloat(
          isCaptain
            ? Math.round(stl * 1 + block * 1) * 3 * 2
            : isViceCaptain
            ? Math.round(stl * 1 + block * 1) * 3 * 1.5
            : Math.round(stl * 1 + block * 1) * 3
        ),
      ]
    )
  );

  // console.log(groups);

  const combination = select_players(groups);

  const group_members = forms.map(({ formFields }) =>
    formFields.reduce((acc, { name }) => acc.concat(name), [])
  );
  // console.log(group_members);

  let length = group_members.length;
  var pgCount = 0;
  var sgCount = 0;
  var sfCount = 0;
  var pfCount = 0;
  var cCount = 0;
  var aCount = 0;
  var bCount = 0;
  var totTeams = 0;
  var subCount = 0;
  let teamWithRange = [];

  for (let comb of combination) {
    let team = comb.map((player) => player[0]);
    pgCount = 0;
    sgCount = 0;
    sfCount = 0;
    pfCount = 0;
    cCount = 0;
    aCount = 0;
    bCount = 0;
    subCount = 0

    var flag = 0;
    if(conPlayers.length > 0){
      for (let conPlayer of conPlayers) {
        if (team.includes(conPlayer)) {
          flag = 1;
        } else {
          flag = 0;
          break;
        }
      }
    }else{
      flag = 1;
    }

    if (flag === 1) {
      for (let player of excludedPlayers) {
        if (team.includes(player)) {
          flag = 0;
          break;
        }
      }
    }
    if (flag === 1 && length === 5 && game === "Basketball") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (group_members[4].includes(player)) {
          cCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount > 0 &&
        pgCount < 5 &&
        sgCount > 0 &&
        sgCount < 5 &&
        sfCount > 0 &&
        sfCount < 5 &&
        pfCount > 0 &&
        pfCount < 5 &&
        cCount > 0 &&
        aCount > 2 &&
        bCount > 2
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (flag === 1 && length === 5 && game === "Volleyball") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (group_members[4].includes(player)) {
          cCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount === 1 &&
        sgCount > 0 &&
        sfCount > 0 &&
        pfCount > 0 &&
        cCount > 0 &&
        aCount > 1 &&
        bCount > 1
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (flag === 1 && length === 4 && game === "Cricket") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        } else if (group_members[1].includes(player)) {
          sgCount += 1;
        } else if (group_members[2].includes(player)) {
          sfCount += 1;
        } else if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount > 0 &&
        sgCount > 0 &&
        sfCount > 0 &&
        pfCount > 0 &&
        aCount > 0 &&
        bCount > 0
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (
      flag === 1 &&
      length === 4 &&
      (game === "Football" || game === "Hockey")
    ) {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount === 1 &&
        sgCount > 2 &&
        sfCount > 2 &&
        pfCount > 0 &&
        aCount > 3 &&
        bCount > 3
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (flag === 1 && length === 3 && game === "Kabaddi") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }

        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount > 1 &&
        pgCount < 5 &&
        sgCount > 0 &&
        sgCount < 3 &&
        sfCount > 0 &&
        sfCount < 4 &&
        aCount > 1 &&
        bCount > 1
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (flag === 1 && length === 3 && game === "Handball") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount === 1 &&
        sgCount > 1 &&
        sfCount > 1 &&
        aCount > 1 &&
        bCount > 1
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    } else if (flag === 1 && length === 4 && game === "Baseball") {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (teamAplayers.includes(player)) {
          aCount += 1;
        }
        if (teamBplayers.includes(player)) {
          bCount += 1;
        }
        if (subPlayers.includes(player)) {
          subCount += 1;
        }
      }
      if (
        pgCount > 1 &&
        pgCount < 6 &&
        sgCount > 1 &&
        sgCount < 6 &&
        sfCount === 1 &&
        pfCount === 1 &&
        aCount > 2 &&
        bCount > 2
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          [aCount, "-", bCount],
          comb.reduce((total, player) => total + player[1], 0),
          comb.reduce((totalPoints, player) => totalPoints + player[2], 0),
          comb.reduce(
            (average, player) =>
              average + (player[3] + player[4] + player[5] + player[6]),
            0
          ),
          subCount
        ]);
      }
    }
  }
  console.log(totTeams);
  const sorted_list = teamWithRange.sort((a, b) => b[2] - a[2]);
  return sorted_list;
}
