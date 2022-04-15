import React from "react";

function BabyLogForm() {
  return (
    <div >
      <form>
        <input type="text" name="name" placeholder="Baby name" />
        <br/>
        <input type="radio" name="sex" id="girl" value="Girl" />
        <label>Girl</label>
        <input type="radio" name="sex" id="boy" value="Boy" />
        <label>Boy</label>
        <br/>
        <label>Birthday:</label>
        <input type="date" name="birthday"  />
        <br/>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default BabyLogForm;
