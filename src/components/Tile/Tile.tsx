import React, { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { usePrevProps } from "../../hooks/usePrevProps";
import { useBoard } from "../Board";
import "./tile.less";
import hugh from '../../images/hugh.jpeg'
import kevin from '../../images/kevin.jpeg'
import frankie from '../../images/frankie.jpeg'
import harry from '../../images/harry.jpeg'
import joe from '../../images/joe.jpeg'
import logan from '../../images/logan.jpeg'
import maya from '../../images/maya.jpeg'
import michael from '../../images/michael.jpeg'
import ryan from '../../images/ryan.jpeg'
import bharat from '../images/lightskin.jpeg'
import jacob from '../../images/jacob.jpeg'

interface dataFace  {
  [key: number]: string
}

const data: dataFace = {
  2: hugh,
  4: kevin,
  8: frankie,
  16: harry,
  32: joe,
  64: logan,
  128: maya,
  256: michael,
  512: ryan,
  1024: jacob
  // 2048: bharat
}

type Props = {
  // tile value - 2, 4, 8, 16, 32, ..., 2048.∂
  value: number;
  // an array containing the x and y index on the board.
  position: [number, number];
  // the order of tile on the tile stack.
  zIndex: number;
};

export const Tile = ({ value, position, zIndex }: Props) => {
  // retrieves board properties
  const [containerWidth, tileCount] = useBoard();
  //  state required to animate the highlight
  const [scale, setScale] = useState(1);

  // the previous value (prop) - it is undefined if it is a new tile.
  const previousValue = usePrevProps<number>(value);

  // check if tile is within the board boundries
  const withinBoardBoundaries =
    position[0] < tileCount && position[1] < tileCount;
  invariant(withinBoardBoundaries, "Tile out of bound");

  // if it is a new tile...
  const isNew = previousValue === undefined;
  // ...or its value has changed...
  const hasChanged = previousValue !== value;
  // ... then the tile should be highlighted.
  const shallHighlight = isNew || hasChanged;

  // useEffect will decide if highlight should be triggered.
  useEffect(() => {
    if (shallHighlight) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [shallHighlight, scale]);

  /**
   * Converts tile position from array index to pixels.
   */
  const positionToPixels = (position: number) => {
    return (position / tileCount) * (containerWidth as number);
  };

  // all animations come from CSS transition, and we pass them as styles
  const style = {
    top: positionToPixels(position[1]),
    left: positionToPixels(position[0]),
    transform: `scale(${scale})`,
    zIndex,
  };

  return (
    <div className={`tile tile-${value}`} style={style}>
        <img src = {data[value]} width = '100px' height = '100px' />
    </div>
  );
};
