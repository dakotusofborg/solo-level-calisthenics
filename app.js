const trees = {
  push: {
    name: "Push Skill Tree",
    paths: [
      {
        id: "vertical",
        title: "Vertical Press",
        subtitle: "Overhead press to handstand",
        icon: "UP",
        tiers: [
          tier(1, ["Pike push-up", "Elevated pike push-up", "Wall walks"], "Own the overhead line"),
          tier(2, ["Wall handstand hold", "Box HSPU", "Negative HSPU"], "Shoulder mobility, wall balance, overhead strength"),
          tier(3, ["Wall HSPU", "Chest-to-wall HSPU", "Partial free HSPU"]),
          tier(4, ["Freestanding HSPU", "Freestanding handstand"]),
          tier(5, ["Deficit free HSPU", "90-degree push-up"])
        ],
        mistake: "Skipping the line and chasing reps before control"
      },
      {
        id: "planche",
        title: "Planche",
        subtitle: "Straight-arm horizontal power",
        icon: "PL",
        tiers: [
          tier(1, ["Frog stand", "Planche lean", "Pseudo planche push-up"], "Straight-arm strength"),
          tier(2, ["Tuck planche", "Tuck planche push-up"]),
          tier(3, ["Advanced tuck planche", "Advanced tuck push-up"]),
          tier(4, ["Straddle planche", "Straddle push-up"]),
          tier(5, ["Full planche", "Full planche push-up"])
        ],
        mistake: "Bent arms and chasing full planche too early"
      },
      {
        id: "unilateral-push",
        title: "Unilateral",
        subtitle: "One-arm pressing",
        icon: "1A",
        tiers: [
          tier(1, ["Archer push-up", "Uneven push-up"], "Shoulder stability"),
          tier(2, ["Typewriter push-up", "Band-assisted 1-arm push-up"]),
          tier(3, ["Assisted one-arm push-up", "Elevated one-arm push-up"]),
          tier(4, ["One-arm push-up", "Deficit one-arm push-up"]),
          tier(5, ["1-arm pseudo planche push-up", "90-degree one-arm"])
        ],
        mistake: "Twisting the hips to cheat the range"
      },
      {
        id: "rings-push",
        title: "Rings",
        subtitle: "Instability plus strength",
        icon: "OO",
        tiers: [
          tier(1, ["Ring support hold", "Ring push-up"], "Support position"),
          tier(2, ["Ring dips", "Deep ring push-up"]),
          tier(3, ["RTO ring dips", "RTO support hold"]),
          tier(4, ["Bulgarian ring dips", "Ring planche lean"]),
          tier(5, ["Maltese", "Ring planche"])
        ],
        mistake: "Skipping support holds and ring turn-out"
      }
    ]
  },
  pull: {
    name: "Pull Skill Tree",
    paths: [
      {
        id: "vertical-pull",
        title: "Vertical Pull",
        subtitle: "Pull-up to one-arm pull",
        icon: "DN",
        tiers: [
          tier(1, ["Active hang 60s", "Scapular pull-ups x15", "Negative pull-ups x5"], "Scapular control"),
          tier(2, ["Pull-ups x8 unbroken", "Chin-ups x10", "Hollow body pull-up form"]),
          tier(3, ["Pull-ups x15 unbroken", "Chest-to-bar x5", "Archer pull-up negatives"]),
          tier(4, ["Pull-ups x25 unbroken", "Weighted pull-up +25% BW x5", "Archer pull-ups x5/side"]),
          tier(5, ["Pull-ups x30 unbroken", "One-arm chin negative 10s/side", "Assisted one-arm pull-up"])
        ],
        mistake: "Adding reps without full hang, chest rise, and shoulder depression"
      },
      {
        id: "front-lever",
        title: "Front Lever",
        subtitle: "Straight-body pulling",
        icon: "FL",
        tiers: [
          tier(1, ["Tuck lever hold 15s", "Hollow body hold 45s", "Skin-the-cat x3"], "Core compression"),
          tier(2, ["Advanced tuck lever 12s", "Tuck lever rows x8"]),
          tier(3, ["One-leg front lever 10s/side", "Advanced tuck rows x8"]),
          tier(4, ["Straddle front lever 8s", "Straddle lever rows x5"]),
          tier(5, ["Full front lever 8s", "Full front lever rows x3"])
        ],
        mistake: "Letting the hips sag instead of regressing the lever"
      },
      {
        id: "muscle-up",
        title: "Muscle-Up",
        subtitle: "Pull, transition, dip",
        icon: "MU",
        tiers: [
          tier(1, ["Straight bar dips x8", "Explosive pull-ups x5", "False grip hang 20s"], "Dip strength"),
          tier(2, ["Chest-to-bar pull-ups x6", "Russian dips x5", "Low-ring transitions x10"]),
          tier(3, ["Band muscle-up x5", "High pull-up to sternum x3"]),
          tier(4, ["Strict bar muscle-up x3", "Strict ring muscle-up x1"]),
          tier(5, ["Slow ring muscle-up", "Weighted muscle-up +10% BW", "L-sit muscle-up"])
        ],
        mistake: "Kipping through a weak transition"
      },
      {
        id: "rings-pull",
        title: "Rings Pull",
        subtitle: "Rows, levers, false grip",
        icon: "RG",
        tiers: [
          tier(1, ["Ring rows x15", "False grip hold 20s", "Active ring hang 45s"], "Grip and scapula"),
          tier(2, ["Feet-elevated ring rows x12", "Ring chin-ups x8"]),
          tier(3, ["Archer ring rows x6/side", "Ring pull-ups x12", "Tuck lever on rings 12s"]),
          tier(4, ["Typewriter ring pull-ups x4/side", "Advanced tuck lever rings 10s"]),
          tier(5, ["Ring archer pull-ups x8/side", "Ring front lever 8s", "One-arm ring row x8/side"])
        ],
        mistake: "Losing false grip and scapular tension under fatigue"
      }
    ]
  }
};

const defaultState = {
  activeTree: "push",
  completed: {},
  questCompleted: {},
  weekKey: ""
};

let state = loadState();

function tier(level, milestones, note = "", benchmark = "") {
  const finalMilestone = milestones[milestones.length - 1];
  return {
    level,
    note,
    benchmark: benchmark || `Demonstrate ${finalMilestone} with clean form and no pain`,
    milestones: milestones.map((label, index) => ({
      id: `l${level}-${index}`,
      label
    }))
  };
}

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem("calisthenics-system")) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem("calisthenics-system", JSON.stringify(state));
}

function milestoneKey(treeId, pathId, level, milestoneId) {
  return `${treeId}:${pathId}:L${level}:${milestoneId}`;
}

function benchmarkKey(treeId, pathId, level) {
  return `${treeId}:${pathId}:L${level}:benchmark`;
}

function isMilestoneComplete(treeId, pathId, tierData, milestone) {
  return Boolean(state.completed[milestoneKey(treeId, pathId, tierData.level, milestone.id)]);
}

function isBenchmarkComplete(treeId, pathId, tierData) {
  const key = benchmarkKey(treeId, pathId, tierData.level);
  return Boolean(state.completed[key]);
}

function isTierComplete(treeId, pathId, tierData) {
  return isBenchmarkComplete(treeId, pathId, tierData);
}

function isTierUnlocked(treeId, path, tierIndex) {
  if (tierIndex === 0) return true;
  return isTierComplete(treeId, path.id, path.tiers[tierIndex - 1]);
}

function render() {
  const tree = trees[state.activeTree];
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tree === state.activeTree);
  });
  document.getElementById("treeName").textContent = tree.name;
  renderTree(tree);
  renderStats();
  renderDailyGoals();
  renderWeeklyGoals();
}

function renderTree(tree) {
  const treeGrid = document.getElementById("treeGrid");
  treeGrid.innerHTML = tree.paths.map((path) => renderPath(state.activeTree, path)).join("");
  treeGrid.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.completed[event.target.dataset.key] = event.target.checked;
      saveState();
      render();
    });
  });
}

function renderPath(treeId, path) {
  const tiers = path.tiers.map((tierData) => {
    const originalIndex = path.tiers.findIndex((item) => item.level === tierData.level);
    const unlocked = isTierUnlocked(treeId, path, originalIndex);
    const complete = isTierComplete(treeId, path.id, tierData);
    const current = unlocked && !complete;
    const stateText = complete ? "Cleared" : unlocked ? "Active" : "Locked";
    const gateKey = benchmarkKey(treeId, path.id, tierData.level);
    const gateChecked = isBenchmarkComplete(treeId, path.id, tierData) ? "checked" : "";
    const gateDisabled = unlocked ? "" : "disabled";
    const milestoneList = tierData.milestones.map((milestone) => {
      return `
        <li>
          <div class="milestone">
            <i aria-hidden="true"></i>
            <span>${milestone.label}<small>${tierData.note}</small></span>
          </div>
        </li>
      `;
    }).join("");
    return `
      <article class="tier ${unlocked ? "" : "locked"} ${complete ? "complete" : ""} ${current ? "current" : ""}">
        <div class="tier-head">
          <span class="tier-badge">${tierData.level}</span>
          <span class="tier-state">${stateText}</span>
        </div>
        <label class="benchmark">
          <input type="checkbox" data-key="${gateKey}" ${gateChecked} ${gateDisabled} />
          <span><b>Benchmark</b>${tierData.benchmark}</span>
        </label>
        <ul>${milestoneList}</ul>
        ${tierData.level === 1 ? `<div class="foundation">${path.tiers[0].note}</div>` : ""}
      </article>
    `;
  }).join("");

  return `
    <section class="path">
      <div class="path-title">
        <span class="icon">${path.icon}</span>
        <h2>${path.title}</h2>
        <p>${path.subtitle}</p>
      </div>
      <div class="tier-stack">${tiers}</div>
      <div class="warning">${path.mistake}</div>
    </section>
  `;
}

function renderStats() {
  const totals = Object.entries(trees).flatMap(([treeId, tree]) =>
    tree.paths.flatMap((path) => path.tiers.flatMap((tierData) =>
      [
        {
          key: benchmarkKey(treeId, path.id, tierData.level),
          level: tierData.level + 1
        },
        ...tierData.milestones.map((milestone) => ({
          key: milestoneKey(treeId, path.id, tierData.level, milestone.id),
          level: tierData.level
        }))
      ]
    ))
  );
  const completed = totals.filter((item) => state.completed[item.key]);
  const xp = completed.reduce((sum, item) => sum + item.level * 7, 0);
  const xpPerLevel = 60;
  const level = Math.max(1, Math.floor(xp / xpPerLevel) + 1);
  const levelXp = xp % xpPerLevel;
  const hp = Math.min(100, 20 + completed.length * 4);
  const mp = Math.min(100, xp % 100);
  const pushCleared = countCompletedMilestones("push");
  const pullCleared = countCompletedMilestones("pull");
  const totalActive = totals.filter((item) => state.completed[item.key]).length;

  document.getElementById("athleteLevel").textContent = level;
  document.getElementById("rankTitle").textContent = level > 12 ? "Shadow Monarch" : level > 7 ? "Elite Hunter" : level > 3 ? "Wolf Assassin" : "Novice Hunter";
  document.getElementById("expBar").value = levelXp;
  document.getElementById("expBar").max = xpPerLevel;
  document.getElementById("expText").textContent = `${levelXp}/${xpPerLevel}`;
  setBar("hp", hp);
  setBar("mp", mp);
  document.getElementById("strStat").textContent = 8 + pushCleared;
  document.getElementById("vitStat").textContent = 8 + Math.floor(totalActive / 2);
  document.getElementById("agiStat").textContent = 8 + pullCleared;
  document.getElementById("perStat").textContent = 8 + completed.filter((item) => item.level >= 3).length;
  document.getElementById("treeCompletion").textContent = `${getTreeCompletion(state.activeTree)}%`;
}

function setBar(id, value) {
  document.getElementById(`${id}Bar`).value = value;
  document.getElementById(`${id}Text`).textContent = `${value}/100`;
}

function countCompletedMilestones(treeId) {
  const tree = trees[treeId];
  return tree.paths.reduce((sum, path) => sum + path.tiers.reduce((tierSum, tierData) => (
    tierSum + tierData.milestones.filter((milestone) => isMilestoneComplete(treeId, path.id, tierData, milestone)).length
  ), 0), 0);
}

function getTreeCompletion(treeId) {
  const tree = trees[treeId];
  const total = tree.paths.reduce((sum, path) => sum + path.tiers.length, 0);
  const complete = tree.paths.reduce((sum, path) => (
    sum + path.tiers.filter((tierData) => isTierComplete(treeId, path.id, tierData)).length
  ), 0);
  return Math.round((complete / total) * 100);
}

function renderWeeklyGoals() {
  const weekKey = getWeekKey(new Date());
  const goals = getWeeklyGoals();
  const complete = goals.length > 0 && goals.every((goal) => isQuestComplete(goal.questKey));
  document.getElementById("weekStamp").textContent = weekKey;
  document.getElementById("weeklyGoals").innerHTML = `
    ${renderQuestCompleteBanner(complete, "Weekly Complete")}
    ${goals.map((goal) => `
    <article class="quest ${isQuestComplete(goal.questKey) ? "done" : ""}">
      <label class="quest-check">
        <input type="checkbox" data-quest-key="${goal.questKey}" ${isQuestComplete(goal.questKey) ? "checked" : ""} />
        <span>
          <strong>${goal.label}</strong>
          <small>${goal.meta}</small>
        </span>
      </label>
    </article>
  `).join("")}
  `;
  bindQuestCheckboxes(document.getElementById("weeklyGoals"));
}

function renderDailyGoals() {
  const date = new Date();
  document.getElementById("dayStamp").textContent = getDayKey(date);
  const workouts = ["push", "pull"].map((treeId) => getDailyWorkout(treeId, date));
  document.getElementById("dailyGoals").innerHTML = `
  ${workouts.map((workout) => {
    const workoutComplete = workout.items.every((item) => isQuestComplete(item.questKey));
    return `
    <article class="quest daily workout ${workoutComplete ? "done" : ""}">
      ${renderQuestCompleteBanner(workoutComplete, `${workout.title} Complete`)}
      <strong>${workout.title}</strong>
      <small>${workout.meta}</small>
      <ul>
        ${workout.items.map((item) => `
          <li class="${isQuestComplete(item.questKey) ? "done" : ""}">
            <label class="quest-check">
              <input type="checkbox" data-quest-key="${item.questKey}" ${isQuestComplete(item.questKey) ? "checked" : ""} />
              <span>
                <b>${item.path} L${item.level}</b>
                <em>${item.prescription}</em>
              </span>
            </label>
          </li>
        `).join("")}
      </ul>
    </article>
  `;
  }).join("")}
  `;
  bindQuestCheckboxes(document.getElementById("dailyGoals"));
}

function renderQuestCompleteBanner(isComplete, label) {
  return isComplete ? `<div class="quest-complete">${label}</div>` : "";
}

function bindQuestCheckboxes(container) {
  container.querySelectorAll("[data-quest-key]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.questCompleted[event.target.dataset.questKey] = event.target.checked;
      saveState();
      renderDailyGoals();
      renderWeeklyGoals();
    });
  });
}

function isQuestComplete(key) {
  return Boolean(state.questCompleted[key]);
}

function getDailyWorkout(treeId, date) {
  const activeBlocks = getActiveTierBlocks(treeId);
  if (!activeBlocks.length) {
    return {
      title: `Daily ${trees[treeId].name.replace(" Skill Tree", "")}`,
      meta: "All columns cleared",
      items: [{
        path: "Mastery",
        level: "-",
        prescription: "Run maintenance work or add a harder progression.",
        questKey: `daily:${getDateStorageKey(date)}:${treeId}:mastery`
      }]
    };
  }

  return {
    title: `Daily ${trees[treeId].name.replace(" Skill Tree", "")}`,
    meta: `${activeBlocks.length} active columns only`,
    items: activeBlocks.map((block) => ({
      path: block.path.title,
      level: block.tier.level,
      prescription: makeWorkoutPrescription(block),
      questKey: `daily:${getDateStorageKey(date)}:${treeId}:${block.path.id}:L${block.tier.level}`
    }))
  };
}

function getActiveTierBlocks(treeId) {
  return trees[treeId].paths
    .map((path) => {
      const tierData = path.tiers.find((tierItem, index) => isTierUnlocked(treeId, path, index) && !isTierComplete(treeId, path.id, tierItem));
      return tierData ? { treeId, path, tier: tierData } : null;
    })
    .filter(Boolean);
}

function makeWorkoutPrescription(block) {
  const movements = block.tier.milestones
    .slice(0, 2)
    .map((milestone) => milestone.label)
    .join(" + ");
  const benchmark = block.tier.benchmark;

  if (benchmark.toLowerCase().includes("hold") || benchmark.toLowerCase().includes("hang") || benchmark.toLowerCase().includes("lever") || benchmark.toLowerCase().includes("planche")) {
    return `${movements}: 4-6 quality sets, stop before form breaks. Benchmark: ${benchmark}`;
  }

  if (benchmark.toLowerCase().includes("negative")) {
    return `${movements}: 3-5 slow controlled sets. Benchmark: ${benchmark}`;
  }

  return `${movements}: 3-5 submax sets with clean reps. Benchmark: ${benchmark}`;
}

function getWeeklyGoals() {
  const weekKey = getWeekKey(new Date());
  return seededPick(getQuestCandidates(), weekKey, 5).map((goal) => ({
    ...goal,
    label: makeWeeklyTarget(goal),
    meta: `${goal.tree.toUpperCase()} / ${goal.path} / Level ${goal.level} / Cumulative`,
    questKey: `weekly:${weekKey}:${goal.tree}:${goal.pathId}:L${goal.level}`
  }));
}

function getQuestCandidates() {
  const candidates = [];
  Object.entries(trees).forEach(([treeId, tree]) => {
    tree.paths.forEach((path) => {
      const nextTier = path.tiers.find((tierData, index) => isTierUnlocked(treeId, path, index) && !isTierComplete(treeId, path.id, tierData));
      if (!nextTier) return;
      const milestone = nextTier.milestones.find((item) => !isMilestoneComplete(treeId, path.id, nextTier, item));
      if (milestone || !isBenchmarkComplete(treeId, path.id, nextTier)) {
        candidates.push({
          tree: treeId,
          pathId: path.id,
          path: path.title,
          level: nextTier.level,
          label: milestone ? milestone.label : nextTier.benchmark,
          benchmark: nextTier.benchmark
        });
      }
    });
  });
  return candidates;
}

function makeDailyTarget(goal) {
  const label = goal.label.toLowerCase();
  if (label.includes("hold") || label.includes("hang") || label.includes("lever") || label.includes("planche")) {
    return `Practice ${goal.label}: 4 quality sets toward ${goal.benchmark}`;
  }
  if (label.includes("negative")) {
    return `Practice ${goal.label}: 3 controlled sets toward ${goal.benchmark}`;
  }
  if (label.includes("mobility") || label.includes("balance") || label.includes("control")) {
    return `Drill ${goal.label}: 10 focused minutes toward ${goal.benchmark}`;
  }
  return `Practice ${goal.label}: 3-5 clean submax sets toward ${goal.benchmark}`;
}

function makeWeeklyTarget(goal) {
  const label = goal.label.toLowerCase();
  if (label.includes("hold") || label.includes("hang") || label.includes("lever") || label.includes("planche")) {
    return `Accumulate 6-8 quality sets toward benchmark: ${goal.benchmark}`;
  }
  if (label.includes("negative")) {
    return `Accumulate 12-18 controlled reps toward benchmark: ${goal.benchmark}`;
  }
  if (label.includes("x30") || label.includes("x25") || label.includes("weighted")) {
    return `Build toward benchmark: ${goal.benchmark} with 4+ submax sessions`;
  }
  return `Accumulate 18-30 clean reps toward benchmark: ${goal.benchmark}`;
}

function seededPick(items, seed, count) {
  const scored = items.map((item, index) => ({
    item,
    score: hash(`${seed}:${item.tree}:${item.path}:${item.level}:${index}`)
  }));
  return scored.sort((a, b) => a.score - b.score).slice(0, count).map((entry) => entry.item);
}

function hash(value) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result << 5) - result + value.charCodeAt(index);
    result |= 0;
  }
  return Math.abs(result);
}

function getWeekKey(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstDay) / 86400000);
  const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
  return `${date.getFullYear()} W${String(week).padStart(2, "0")}`;
}

function getDayKey(date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getDateStorageKey(date) {
  return date.toISOString().slice(0, 10);
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTree = button.dataset.tree;
    saveState();
    render();
  });
});

document.getElementById("resetProgress").addEventListener("click", () => {
  if (!confirm("Reset all progression data?")) return;
  state = { ...defaultState, completed: {} };
  saveState();
  render();
});

document.getElementById("resetCurrentTree").addEventListener("click", () => {
  const treeName = trees[state.activeTree].name;
  if (!confirm(`Reset ${treeName}?`)) return;
  clearTreeProgress(state.activeTree);
  saveState();
  render();
});

document.getElementById("resetAllTrees").addEventListener("click", () => {
  if (!confirm("Reset every push and pull skill tree milestone?")) return;
  state.completed = {};
  saveState();
  render();
});

function clearTreeProgress(treeId) {
  Object.keys(state.completed).forEach((key) => {
    if (key.startsWith(`${treeId}:`)) {
      delete state.completed[key];
    }
  });
}

function bootCanvas() {
  const canvas = document.getElementById("systemCanvas");
  const ctx = canvas.getContext("2d");
  const lines = Array.from({ length: 38 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.00012 + (index % 7) * 0.00002,
    length: 90 + (index % 5) * 36
  }));

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.strokeStyle = "rgba(126, 233, 255, 0.16)";
    ctx.lineWidth = 1;
    lines.forEach((line, index) => {
      const x = ((line.x * width) + time * line.speed * width) % (width + line.length) - line.length;
      const y = line.y * height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + line.length, y + Math.sin(time / 900 + index) * 16);
      ctx.stroke();
    });
    ctx.strokeStyle = "rgba(244, 176, 66, 0.13)";
    ctx.strokeRect(width * 0.08, height * 0.08, width * 0.84, height * 0.84);
    ctx.restore();
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

bootCanvas();
render();
