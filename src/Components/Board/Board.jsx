import React, { useState } from 'react'
import "./Board.css"
import { X } from 'react-feather'
import Card from '../Card/Card'
import Editable_Card from '../Editable/Editable_Card'

function Board(props) {

    return (
        <div className='board'>
            <div className='board_top'>
                <p className='board_top_title'>{props.board?.title}<span className='counter'>{`  ${props.board?.cards?.length}`}</span></p>
                <div className='board_top_more'>
                <X onClick={()=>props.removeBoard(props.board?.id)}></X>                    
                </div>

            </div>
            <div className="board_cards custom-scroll">
                {
                    props.board?.cards?.map((item)=><Card key={item.id} card={item} removeCard={props.removeCard}
                     boardId = {props.board?.id} handelDragEnter={props.handelDragEnter} handelDragEnd={props.handelDragEnd} inputValue={props.inputValue}></Card>)
                }


                {
                    props.board?.id === props.firstBoardId ? <Editable_Card
                    displayClass="boards_cards_add"
                    text="Add Card"
                    placeholder="Enter Card Name"
                    onSubmit={(value, description, startDate, endDate, assignee, Task)=> props.addCard(value, description, startDate, endDate, assignee, Task, props.board?.id)}></Editable_Card> : ""
                }
                
            </div>

        </div>
    )
}

export default Board