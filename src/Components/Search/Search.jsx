import React, { useEffect, useState } from 'react'

function Search(props) {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (props.submit) props.submit(inputValue);
  })
  return (
    <>
      <form action="">
        <input type="text" value={inputValue} onChange={(e) => { setInputValue(e.target.value); }} />
      </form>
    </>
  )
}

export default Search;