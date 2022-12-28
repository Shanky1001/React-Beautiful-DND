import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

const data = [
  {
    id: "item-1",
    content: "Item-1",
  },
  {
    id: "item-2",
    content: "Item-2",
  },
  {
    id: "item-3",
    content: "Item-3",
  },
  {
    id: "item-4",
    content: "Item-4",
  },
  {
    id: "item-5",
    content: "Item-5",
  },
  {
    id: "item-6",
    content: "Item-6",
  },
  {
    id: "item-7",
    content: "Item-7",
  },
  {
    id: "item-8",
    content: "Item-8",
  },
  {
    id: "item-9",
    content: "Item-9",
  },
];

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(data);
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((val, index) => (
              <Draggable key={val.id} draggableId={val.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {val.content}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
