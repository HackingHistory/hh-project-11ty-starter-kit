---
title: "Your story"
description: "It's important for this project that it offer opportunites for reflection."
date: 2022-01-04
---

<!DOCTYPE html>
<html>
<head>
<style>
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}

</style>
</head>
<body>

<h4>I would like to share:</h4>
<form>
  <input type="radio" id="html" name="fav_language" value="A memory">
  <label for="html">A memory</label><br>
  <input type="radio" id="css" name="fav_language" value="A story">
  <label for="css">A story</label><br>
  <input type="radio" id="javascript" name="fav_language" value="Some thoughts">
  <label for="javascript">Some thoughts</label><br><br>
</form>

 <textarea name="message" rows="10" cols="50">
</textarea> 

<form>
<label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname"><br>
  <input id="emailAddress" type="email" multiple><bt>
  <label for="emailAddress">Email address:</label><br><br>
  </form>
 <h4>May we publish your contribution?</h4><br>
<form>
  <input type="radio" id="yes" name="options" value="Yes">
  <label for="yes">Yes</label><br>
  <input type="radio" id="no" name="options" value="No">
  <label for="no">No</label><br>
</form> 


<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>


</body>
</html>