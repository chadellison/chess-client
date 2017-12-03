const deserialize = (object) => {
  return {
    color: object.attributes.color,
    type: object.attributes.pieceType,
    currentPosition: object.attributes.currentPosition,
    startIndex: object.attributes.startIndex,
    hasMoved: object.attributes.hasMoved,
    movedTwo: object.attributes.movedTwo,
    notation: object.attributes.notation
  }
}

export default deserialize
