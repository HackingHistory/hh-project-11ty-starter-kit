---
title: "Your story"
description: "It's important for this project that it offer opportunites for reflection."
---

<!DOCTYPE html>
<html>
<body>

<h4>I would like to share:</h4>
<form>
  <input type="radio" id="html" name="fav_language" value="A memory">
  <label for="html">A memory</label><br>
  <input type="radio" id="css" name="fav_language" value="A story">
  <label for="css">A story</label><br>
  <input type="radio" id="javascript" name="fav_language" value="Some thoughts">
  <label for="javascript">Some thoughts</label>
</form>

 <textarea name="message" rows="10" cols="60">
</textarea> 

<form>
<label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname"><br>
  <input id="emailAddress" type="email" multiple>
  <label for="emailAddress">Email address:</label><br>
  </form>

 <h3>May we publish your contribution?</h3>

<form>
  <input type="radio" id="yes" name="options" value="Yes">
  <label for="yes">Yes</label><br>
  <input type="radio" id="no" name="options" value="No">
  <label for="no">No</label><br>
</form> 

button type="button" class="collapsible">Open Collapsible</button>
<div class="content">
  <p>Lorem ipsum...</p>
</div>

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