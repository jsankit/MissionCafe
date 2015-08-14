//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, desc TEXT, rating INTEGER, date_add TEXT)";
 
var selectAllStatement = "SELECT * FROM Contacts";
 
var insertStatement = "INSERT INTO Clients (name, email, phone, desc, rating) VALUES (?, ?, ?, ?, ?)";
 
var updateStatement = "UPDATE Clients SET name = ?, email = ?, phone = ?, desc = ?, rating = ?, date_add = ? WHERE id=?";
 
var deleteStatement = "DELETE FROM Cleints WHERE id=?";
 
var dropStatement = "DROP TABLE Clients";
 
var db = openDatabase("ClientsDb", "1.0", "Clients Detail", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var usernametemp = $('input:text[id=txtname]').val();
 
        var useremailtemp = $('#txtemail').val();
		
		var userphonetemp = $('#txtphone').val();
		
		var usercommentstemp = $('#txtcomments').val();
		
		var userratingtemp = $('#hdnrating').val();
		
		//alert(usernametemp);
		//alert(useremailtemp);
		//alert(userphonetemp);
		//alert(usercommentstemp);
		
		$.get('http://www.technowitty.in/mission-cafe/server.php?name='+usernametemp+'&email='+useremailtemp+'&phone='+userphonetemp+'&comment='+usercommentstemp+'&rating='+userratingtemp, function(data){
			if(data ==1)
			{
			 console.log(data);
			 alert('It was pleasure serving food for you.');
			}
			else
			{
			console.log(data);
			alert('There was an error adding your comment');
			}
		});
		
        db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, useremailtemp, userphonetemp, usercommentstemp, userratingtemp], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var usernameupdate = $('input:text[id=username]').val().toString();
 
    var useremailupdate = $('input:text[id=useremail]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
 
}
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{
 
    var item = dataset.item(i);
 
    $("#username").val((item['username']).toString());
 
    $("#useremail").val((item['useremail']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#username").val("");
 
    $("#useremail").val("");
 
    $("#id").val("");
	
	//window.location.href="index.html";
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 	//alert("Thanks for your precious time.");
    resetForm();
 	
    //showRecords()
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list

 
{
 
    $("#results").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<li>' + item['username'] + ' , ' + item['useremail'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
 
}
 
$(document).ready(function () // Call function when page is ready for load..
 
{
 
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
	
	$("#btnSave").click(insertRecord);

    //$("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    //$("#btnDrop").click(dropTable);
 
});