import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TestPage = () => {
  const finalSpaceCharacters = [
    {
      id: 'gary',
      name: 'Gary Goodspeed'
    },
    {
      id: '2asd',
      name: 'Gary d'
    }
  ];

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {finalSpaceCharacters.map(({ id, name }, index) => (
              <li key={id}>
                <p>{name}</p>
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TestPage;
