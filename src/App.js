import { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import Editable from './Components/Editable/Editable';
import ShowNavbar from './Components/Navbar/Navbar';


function App() {
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("Entries")) || [
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Shani Gupta",
          Task: "Add Drag and Drop Functionality"
        },
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Piyush Dangi",
          Task: "Add different columns and perform crud operations on them"
        }
      ]
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "In Progress",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Arushi Thakur",
          Task: "Add cards and perform crud operations on them"
        },
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Abhishek Singh",
          Task: "Add search functionality"
        }
      ]
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Completed",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Sai Teja",
          Task: "Add login signup functionalities"
        },
        {
          id: Date.now() + Math.random(),
          title: "Kanban Board",
          desc: "Design a kanban board using react",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          assignee: "Manisha Mishra",
          Task: "Make navbar and add routing in it"
        }
      ]
    }
  ]);

  const [target, setTarget] = useState({
    card_id: "",
    board_id: ""
  })


  const [firstBoardId, setFirstBoardId] = useState(0);
  // Storing data in local storage...
  useEffect(() => {
    localStorage.setItem("Entries", JSON.stringify(boards));
    setFirstBoardId(JSON.parse(localStorage.getItem("Entries"))[0].id);

  }, [boards]);

  // To add a new board
  const addBoard = (title) => {
    setBoards([...boards, {
      id: Date.now() + Math.random(),
      title: title,
      cards: []
    }])
  }

  // To remove board
  const removeBoard = (board_id) => {
    const tempBoards = boards.filter((item) => item.id !== board_id);
    setBoards(tempBoards);
  }


  // To add new card whose board_id we know (means in which board we are going to add cards)
  const addCard = (title, description, startDate, endDate, assignee, Task, board_id) => {
    const card = {
      id: Date.now() + Math.random(),
      title: title,
      desc: description,
      startDate: startDate,
      endDate: endDate,
      assignee: assignee,
      Task: Task
    }

    const index = boards.findIndex((item) => item.id === board_id);

    if (index < 0) return;
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  }

  // To Remove the card
  const removeCard = (card_id, board_id) => {
    const boardIndex = boards.findIndex((item) => item.id === board_id);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === card_id)
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  }

  // Drag & Drop Functions

  const handelDragEnter = (card_id, board_id) => {
    console.log(card_id + " " + board_id);
    setTarget({ card_id, board_id });
  }

  const handelDragEnd = (card_id, board_id) => {
    let sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex;

    sourceBoardIndex = boards.findIndex((item) => item.id === board_id);
    if (sourceBoardIndex < 0) return;

    sourceCardIndex = boards[sourceBoardIndex].cards?.findIndex((item) => item.id === card_id);
    if (sourceCardIndex < 0) return;

    targetBoardIndex = boards.findIndex((item) => item.id === target.board_id);
    if (targetBoardIndex < 0) return;
    // console.log(target.card_id);
    targetCardIndex = boards[targetBoardIndex].cards?.findIndex((item) => item.id === target.card_id);
    if (targetCardIndex < 0) return;

    // console.log(targetCardIndex);
    //Now we have to remove that card from source board and push to its target board

    const tempBoards = [...boards];
    const tempCard = tempBoards[sourceBoardIndex].cards[sourceCardIndex]; // keeping copy of that card which i want to drag

    tempBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1); // remove that card from source board
    console.log(targetBoardIndex);
    console.log(targetCardIndex);
    tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, tempCard); // Adding that card to destination
    setBoards(tempBoards);
  }

  return (
    <>

      <div className="app">
        <ShowNavbar submit={(inputValue) => setInputValue(inputValue)}>
        </ShowNavbar>
        <div className='app_outer'>
          <div className='app_boards'>
            {boards.map((item) => <Board key={item.id} board={item} removeBoard={removeBoard}
              addCard={addCard} removeCard={removeCard} handelDragEnter={handelDragEnter} handelDragEnd={handelDragEnd} firstBoardId={firstBoardId} inputValue={inputValue} />)}

            <div className='app_boards_board'>
              <Editable
                displayClass="app_boards_board_add"
                text="Add Column"
                placeholder="Enter board title"
                onSubmit={value => addBoard(value)}></Editable>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
