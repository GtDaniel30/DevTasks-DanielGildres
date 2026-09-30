import { describe, it, expect } from "vitest";
import {
  createTask,
  isValidTask,
  filterTasks,
  getTaskStats
} from "../js/Taskmanager.js";

describe("isValidTask", () => {
  it("accepta una tasca amb text", () => {
    expect(isValidTask("Aprendre GitHub")).toBe(true);
  });

  it("rebutja una tasca buida", () => {
    expect(isValidTask("")).toBe(false);
  });

  it("rebutja una tasca formada només per espais", () => {
    expect(isValidTask("   ")).toBe(false);
  });

  it("rebutja valors que no són text", () => {
    expect(isValidTask(null)).toBe(false);
    expect(isValidTask(42)).toBe(false);
  });
});

describe("createTask", () => {
  it("crea una tasca pendent", () => {
    const task = createTask("Fer els tests");

    expect(task.text).toBe("Fer els tests");
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
  });

  it("retalla els espais al voltant del text", () => {
    expect(createTask("  Llegir documentació  ").text).toBe("Llegir documentació");
  });
});

describe("filterTasks", () => {
  const tasks = [
    { id: 1, text: "Tasca pendent", completed: false },
    { id: 2, text: "Tasca completada", completed: true }
  ];

  it("retorna totes les tasques", () => {
    expect(filterTasks(tasks, "all")).toHaveLength(2);
  });

  it("retorna només les tasques pendents", () => {
    expect(filterTasks(tasks, "pending")).toHaveLength(1);
  });

  it("retorna només les tasques completades", () => {
    expect(filterTasks(tasks, "completed")).toHaveLength(1);
  });

  it("retorna totes les tasques per a un filtre desconegut", () => {
    expect(filterTasks(tasks, "unknown")).toBe(tasks);
  });
});

describe("getTaskStats", () => {
  it("calcula correctament les estadístiques", () => {
    const tasks = [
      { id: 1, text: "Una", completed: false },
      { id: 2, text: "Dues", completed: true },
      { id: 3, text: "Tres", completed: false }
    ];

    expect(getTaskStats(tasks)).toEqual({
      total: 3,
      pending: 2,
      completed: 1
    });
  });

  it("calcula estadístiques correctes per a una llista buida", () => {
    expect(getTaskStats([])).toEqual({ total: 0, pending: 0, completed: 0 });
  });
});
