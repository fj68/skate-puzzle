import { Actor } from "./actor";
import { Color, Colors } from "./color";
import { Direction, Directions } from "./direction";
import { Goal } from "./goal";
import { Mapdata } from "./mapdata";
import { Position } from "./position";
import { choice, randint } from "./random";

export class Board {
  public actors: Map<Color, Actor>;
  public goal: Goal;
  constructor(public mapdata: Mapdata) {
    const positions = this.#initPlaces();
    this.actors = new Map<Color, Actor>(
      Object.values(Colors).map((color, i) => [
        color,
        new Actor(color, positions[i]),
      ])
    );
    this.goal = new Goal(
      choice(Object.values(Colors)),
      positions[positions.length - 1]
    );
  }
  #initPlaces(): Position[] {
    const positions: Position[] = [];
    const needs = Object.values(Colors).length + 1; /* Goal */
    for (let i = 0; i < needs; i++) {
      for (let limit = 50; 0 < limit; limit++) {
        const position = this.randomPlace();
        if (position && positions.every((pos) => !pos.equals(position))) {
          positions.push(position);
          break;
        }
      }
    }
    return positions;
  }
  getActorAt(position: Position): Actor | undefined {
    return this.actors
      .values()
      .find((actor) => actor.position.equals(position));
  }
  randomPlace(): Position | undefined {
    const position = new Position(
      randint(0, this.mapdata.size.width),
      randint(0, this.mapdata.size.height)
    );
    if (this.mapdata.center.contains(position)) {
      return undefined;
    }
    return position;
  }
  randomGoal(): Goal {
    let position;
    for (let limit = 50; 0 < limit; limit--) {
      position = this.randomPlace();
      if (
        position &&
        !position.equals(this.goal.position) &&
        !this.getActorAt(position)
      ) {
        break;
      }
    }
    if (!position) {
      throw new Error("unable to choose position for goal");
    }

    return new Goal(choice(Object.values(Colors)), position);
  }
  nextStop(current: Position, direction: Direction): Position {
    switch (direction) {
      case Directions.North:
        return this.#nextStopNorth(current);
      case Directions.West:
        return this.#nextStopWest(current);
      case Directions.South:
        return this.#nextStopSouth(current);
      case Directions.East:
        return this.#nextStopEast(current);
    }
  }
  #nextStopNorth(current: Position): Position {
    const actorYs = Array.from(this.actors.values())
      .filter(
        (actor) =>
          actor.position.x === current.x && actor.position.y < current.y
      )
      .map((actor) => actor.position.y + 1);
    const wallYs = Array.from(
      this.mapdata.horizontalWalls[current.x].values()
    ).filter((wall) => wall <= current.y);
    const y = Math.max(0, ...actorYs, ...wallYs);
    return new Position(current.x, y);
  }
  #nextStopWest(current: Position): Position {
    const actorXs = Array.from(this.actors.values())
      .filter(
        (actor) =>
          actor.position.y === current.y && actor.position.x < current.x
      )
      .map((actor) => actor.position.x + 1);
    const wallXs = Array.from(
      this.mapdata.verticalWalls[current.y].values()
    ).filter((wall) => wall <= current.x);
    const x = Math.max(0, ...actorXs, ...wallXs);
    return new Position(x, current.y);
  }
  #nextStopSouth(current: Position): Position {
    const actorYs = Array.from(this.actors.values())
      .filter(
        (actor) =>
          actor.position.x === current.x && actor.position.y > current.y
      )
      .map((actor) => actor.position.y);
    const wallYs = Array.from(this.mapdata.horizontalWalls[current.x].values())
      .filter((wall) => wall > current.y)
      .map((wall) => wall);
    const y = Math.min(this.mapdata.size.height, ...actorYs, ...wallYs);
    return new Position(current.x, y - 1);
  }
  #nextStopEast(current: Position): Position {
    const actorXs = Array.from(this.actors.values())
      .filter(
        (actor) =>
          actor.position.y === current.y && actor.position.x > current.x
      )
      .map((actor) => actor.position.x);
    const wallXs = Array.from(
      this.mapdata.verticalWalls[current.y].values()
    ).filter((wall) => wall > current.x);
    const x = Math.min(this.mapdata.size.width, ...actorXs, ...wallXs);
    return new Position(x - 1, current.y);
  }
}
