import { Colors } from "./color";
import { Directions } from "./direction";
import { History, Record } from "./history";
import { Position } from "./position";

describe("History", () => {
  test("push", () => {
    const history = new History();
    const before = history.length;
    history.push(
      new Record(
        Colors.Yellow,
        Directions.North,
        new Position(5, 5),
        new Position(5, 0)
      )
    );
    const after = history.length;
    expect(after - before).toBe(1);
  });

  test("undo", () => {
    const history = new History();
    const record = new Record(
      Colors.Yellow,
      Directions.North,
      new Position(5, 5),
      new Position(5, 0)
    );
    history.push(record);
    const undoRecord = history.undo();
    expect(undoRecord).not.toBeUndefined();
    if (undoRecord) {
      expect(record.equals(undoRecord)).toBeTruthy();
    }
  });

  test("redo", () => {
    const history = new History();
    const record = new Record(
      Colors.Yellow,
      Directions.North,
      new Position(5, 5),
      new Position(5, 0)
    );
    history.push(record);
    history.undo();
    const redoRecord = history.redo();
    expect(redoRecord).not.toBeUndefined();
    if (redoRecord) {
      expect(record.equals(redoRecord)).toBeTruthy();
    }
  });
});
