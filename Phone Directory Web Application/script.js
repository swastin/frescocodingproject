let submit = document.getElementById("submit");
var table = document.querySelectorAll("#summaryTable  tbody")[0];
var dir = "asc";

submit.addEventListener('click', () => {
  /**
   * Get values from the  input 
   */
  let name1 = document.getElementById("name").value;
  let mobile = document.getElementById("mobile").value;
  let email = document.getElementById("email").value;
  namepatt = new RegExp('^[a-zA-Z ]+$');
  var nameRes = namepatt.test(name1);
  mobilepatt = new RegExp('/^[0-9]{1,10}$/');
  var mobileRes = mobilepatt.test(mobile);
  emailpatt = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailRes = new RegExp(emailpatt).test(email);
  /**
   * check wheather error is there or not
   */
  if (nameRes == false && name1 != " ") {

    document.getElementsByClassName('error')[0].style.display = 'block';

  }
  else if (mobileRes == false && mobile.length != 10 && mobile != " ") {

    document.getElementsByClassName('error')[0].style.display = 'block';

  }
  else if (emailRes == false && email != " " && email.length < 40) {

    document.getElementsByClassName('error')[0].style.display = 'block';
  }
  else {
    /**
     * object is created and pushed tocthe contact list
     */
    let clobj = {}
    clobj = { name1, mobile, email }
    contactsList.push(clobj);
    /**
     * insert rows to the table
     */
    var row = document.getElementById("summaryTable").insertRow()
    row.insertCell().innerHTML = name1;
    row.insertCell().innerHTML = mobile;
    row.insertCell().innerHTML = email;
    /**
     * 
     * Reset the form
     */
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";

  }
  sort();
})

const sort = () => {
  rows = table.rows;
  for (let i = 1; i < (rows.length - 1); i++) {
    for (let j = i + 1; j < (rows.length); j++) {
      var x = rows[i].getElementsByTagName("TD")[0];
      var y = rows[j].getElementsByTagName("TD")[0];
      if (dir == "desc") {
        if (x.innerHTML.localeCompare(y.innerHTML)==1) {
          rows[i].parentNode.insertBefore(rows[j], rows[i]);
        }
      }
      else {
        if (x.innerHTML.localeCompare(y.innerHTML)==-1) {
          rows[i].parentNode.insertBefore(rows[j], rows[i]);
        }
      }
    }
  }
  // if (shouldSwitch) {
  //   switching = true;
  //   switchcount++;

  // } else {
  //   if (switchcount == 0 && dir == "asc") {
  //     dir = "desc";
  //     switching = true;
  //   }
  // }

}
const changeType = () => {
  dir = dir == "asc" ? "desc" : "asc";
  sort();
}
document.getElementById('nameColumn').addEventListener('click', changeType)
// /**
//  * 
//  *searching the query
//  */

document.getElementById('search').addEventListener('keyup', (event) => {
  let q = event.target.value;
  let rows = document.querySelectorAll('tbody tr');
  rows.forEach(row => {
    let text = row.querySelector('td').nextElementSibling.textContent
    if (q!=="" && text.startsWith(q)) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
  if (q!=="") {
    let temp = Array.from(rows).filter(row=>row.querySelector('td').nextElementSibling.textContent.startsWith(q))
   if(temp.length == 0)
    {
      document.getElementById('noResult').style.display = "block";
    }
  }
})






/**
* 
*searching the query
*/

document.getElementById('search').addEventListener('keyup',(event)=>{
  let q = event.target.value.toLowerCase();
  let rows = document.querySelectorAll('tbody tr');
  rows.forEach(row => {
   if(row.querySelector('td').nextElementSibling.textContent.toLowerCase().startsWith(q)) {  
      row.style.display = 'table-row';   
   }
   else{
      row.style.display = 'none';
      document.getElementById('noResult').style.display="block";
   }  

  });

})

// let rows = document.querySelectorAll('tbody tr');
// rows.forEach((row, index) => {
//   if ((index) % 2 != 0) {
//     row.style.backgroundColor = "#f2f2f2";

//   }

// })

// var name1 = document.querySelectorAll('#summaryTable tbody')[0].children[1].children[0].innerText.toLowerCase();
// var name2 = document.querySelectorAll('#summaryTable tbody')[0].children[2].children[0].innerText.toLowerCase();
// var name3 = document.querySelectorAll('#summaryTable tbody')[0].children[3].children[0].innerText.toLowerCase();
// console.log(name3);
// console.log(!(`${name1} < ${name2}) || (${name1} < ${name3}) || (${name2} < ${name3})`));