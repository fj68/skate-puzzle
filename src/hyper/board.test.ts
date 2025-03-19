import { Actor } from "./actor";
import { Board } from "./board";
import { Colors } from "./color";
import { Direction, Directions } from "./direction";
import { Mapdata } from "./mapdata";
import { Position } from "./position";
import { Size } from "./size";

interface TestCase {
  actor: Actor;
  direction: Direction;
  setup?: (board: Board) => void;
  expected: Position;
}

function clearActorsOnRow(board: Board, y: number): void {
  for (const [color, actor] of board.actors) {
    if (actor.position.y === y) {
      actor.position.y++;
      board.actors.set(color, actor);
    }
  }
}

function clearActorsOnCol(board: Board, x: number): void {
  for (const [color, actor] of board.actors) {
    if (actor.position.x === x) {
      actor.position.x++;
      board.actors.set(color, actor);
    }
  }
}

describe("Board#nextStop", () => {
  const testcases: { [name: string]: TestCase } = {
    north: {
      actor: new Actor(Colors.Yellow, new Position(5, 5)),
      direction: Directions.North,
      setup(board) {
        clearActorsOnCol(board, 5);
      },
      expected: new Position(5, 0),
    },
    "north and stopped by another actor": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.North,
      setup(board) {
        clearActorsOnCol(board, 6);
        const another = new Actor(Colors.Blue, new Position(6, 3));
        board.actors.set(another.color, another);
      },
      expected: new Position(6, 4),
    },
    "north and stopped by a wall": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.North,
      setup(board) {
        clearActorsOnCol(board, 6);
        board.mapdata.putHorizontalWall(new Position(6, 2));
      },
      expected: new Position(6, 2),
    },
    "north complex": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.North,
      setup(board) {
        clearActorsOnCol(board, 6);
        const actor = new Actor(Colors.Green, new Position(6, 2));
        board.actors.set(actor.color, actor);
        board.mapdata.putHorizontalWall(new Position(6, 2));
      },
      expected: new Position(6, 3),
    },
    west: {
      actor: new Actor(Colors.Yellow, new Position(3, 8)),
      direction: Directions.West,
      setup(board) {
        clearActorsOnRow(board, 8);
      },
      expected: new Position(0, 8),
    },
    "west and stopped by another actor": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.West,
      setup(board) {
        clearActorsOnRow(board, 5);
        const another = new Actor(Colors.Blue, new Position(3, 5));
        board.actors.set(another.color, another);
      },
      expected: new Position(4, 5),
    },
    "west and stopped by a wall": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.West,
      setup(board) {
        clearActorsOnRow(board, 5);
        board.mapdata.putVerticalWall(new Position(2, 5));
      },
      expected: new Position(2, 5),
    },
    "west complex": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.West,
      setup(board) {
        clearActorsOnRow(board, 5);
        const actor = new Actor(Colors.Green, new Position(2, 5));
        board.actors.set(actor.color, actor);
        board.mapdata.putVerticalWall(new Position(2, 5));
      },
      expected: new Position(3, 5),
    },
    south: {
      actor: new Actor(Colors.Yellow, new Position(5, 5)),
      direction: Directions.South,
      setup(board) {
        clearActorsOnCol(board, 5);
      },
      expected: new Position(5, 15),
    },
    "south and stopped by another actor": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.South,
      setup(board) {
        clearActorsOnCol(board, 6);
        const another = new Actor(Colors.Blue, new Position(6, 12));
        board.actors.set(another.color, another);
      },
      expected: new Position(6, 11),
    },
    "south and stopped by a wall": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.South,
      setup(board) {
        clearActorsOnCol(board, 6);
        board.mapdata.putHorizontalWall(new Position(6, 12));
      },
      expected: new Position(6, 11),
    },
    "south complex": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.South,
      setup(board) {
        clearActorsOnCol(board, 6);
        const actor = new Actor(Colors.Green, new Position(6, 12));
        board.actors.set(actor.color, actor);
        board.mapdata.putHorizontalWall(new Position(6, 9));
      },
      expected: new Position(6, 8),
    },
    east: {
      actor: new Actor(Colors.Yellow, new Position(3, 8)),
      direction: Directions.East,
      setup(board) {
        clearActorsOnRow(board, 8);
      },
      expected: new Position(15, 8),
    },
    "east and stopped by another actor": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.East,
      setup(board) {
        clearActorsOnRow(board, 5);
        const another = new Actor(Colors.Blue, new Position(10, 5));
        board.actors.set(another.color, another);
      },
      expected: new Position(9, 5),
    },
    "east and stopped by a wall": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.East,
      setup(board) {
        clearActorsOnRow(board, 5);
        board.mapdata.putVerticalWall(new Position(10, 5));
      },
      expected: new Position(9, 5),
    },
    "east complex": {
      actor: new Actor(Colors.Yellow, new Position(6, 5)),
      direction: Directions.East,
      setup(board) {
        clearActorsOnRow(board, 5);
        const actor = new Actor(Colors.Green, new Position(12, 5));
        board.actors.set(actor.color, actor);
        board.mapdata.putVerticalWall(new Position(12, 5));
      },
      expected: new Position(11, 5),
    },
  };

  for (const [name, testcase] of Object.entries(testcases)) {
    test(name, () => {
      const board = new Board(new Mapdata(new Size(16, 16)));
      testcase?.setup?.(board);
      board.actors.set(testcase.actor.color, testcase.actor);

      const actual = board.nextStop(
        testcase.actor.position,
        testcase.direction
      );
      expect(actual).toEqual<Position>(testcase.expected);
    });
  }
});
