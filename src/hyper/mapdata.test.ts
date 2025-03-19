import { Mapdata } from "./mapdata";
import { Size } from "./size";
import { Position } from "./position";

describe("Mapdata.from", () => {
  interface TestCase {
    input: number[][];
    expected: {
      horizontalWalls: Position[];
      verticalWalls: Position[];
    };
  }

  const testcases: { [name: string]: TestCase } = {
    complex: {
      input: [
        [1, 0, 0, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3],
        [0, 0, 0, 0, 0],
        [0, 0, 3, 0, 1],
      ],
      expected: {
        horizontalWalls: [
          new Position(0, 0),
          new Position(4, 2),
          new Position(2, 4),
          new Position(4, 4),
        ],
        verticalWalls: [
          new Position(0, 4),
          new Position(4, 2),
          new Position(2, 4),
        ],
      },
    },
  };

  for (const [name, testcase] of Object.entries(testcases)) {
    test(name, () => {
      const mapdata = Mapdata.from(testcase.input);
      expect(mapdata).not.toBeUndefined();
      if (!mapdata) {
        return;
      }

      for (const hWall of testcase.expected.horizontalWalls) {
        const horizontalWalls = Array.from(
          mapdata.horizontalWalls[hWall.x].values()
        );
        expect(horizontalWalls).toContain(hWall.y);
      }

      for (const vWall of testcase.expected.verticalWalls) {
        const verticalWalls = Array.from(
          mapdata.verticalWalls[vWall.y].values()
        );
        expect(verticalWalls).toContain(vWall.x);
      }
    });
  }
});

describe("Mapdata#putHorizontalWall", () => {
  interface TestCase {
    size: Size;
    walls: Position[];
  }

  const testcases: { [name: string]: TestCase } = {
    one: {
      size: new Size(6, 6),
      walls: [new Position(0, 0), new Position(5, 5)],
    },
  };

  for (const [name, testcase] of Object.entries(testcases)) {
    test(name, () => {
      const mapdata = new Mapdata(testcase.size);

      for (const wall of testcase.walls) {
        mapdata.putHorizontalWall(wall);
      }

      for (const expected of testcase.walls) {
        expect(
          mapdata.horizontalWalls[expected.x].has(expected.y)
        ).toBeTruthy();
      }
    });
  }
});

describe("Mapdata#putVerticalWall", () => {
  interface TestCase {
    size: Size;
    walls: Position[];
  }

  const testcases: { [name: string]: TestCase } = {
    one: {
      size: new Size(6, 6),
      walls: [new Position(0, 0), new Position(5, 5)],
    },
  };

  for (const [name, testcase] of Object.entries(testcases)) {
    test(name, () => {
      const mapdata = new Mapdata(testcase.size);

      for (const wall of testcase.walls) {
        mapdata.putVerticalWall(wall);
      }

      for (const expected of testcase.walls) {
        expect(mapdata.verticalWalls[expected.y].has(expected.x)).toBeTruthy();
      }
    });
  }
});
