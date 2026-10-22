// This array will store all students
let students = [];


// Function to add student
function addStudent() {

    // Get values from input boxes
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;


    // Check if any field is empty
    if (name == "" || roll == "" || course == "" || marks == "") {
        alert("Please fill all fields");
        return;
    }


    // Create student object
    let student = {
        name: name,
        roll: roll,
        course: course,
        marks: Number(marks)
    };


    // Add student to array
    students.push(student);


    // Show students in table
    showStudents();


    // Clear input boxes
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}


// Function to calculate grade
function getGrade(marks) {

    if (marks >= 90) {
        return "A+";
    }
    else if (marks >= 80) {
        return "A";
    }
    else if (marks >= 70) {
        return "B";
    }
    else if (marks >= 60) {
        return "C";
    }
    else if (marks >= 50) {
        return "D";
    }
    else {
        return "F";
    }
}


// Function to display students
function showStudents() {

    let table = document.getElementById("studentList");

    table.innerHTML = "";


    for (let i = 0; i < students.length; i++) {

        let student = students[i];

        table.innerHTML += `
            <tr>

                <td>${student.roll}</td>

                <td>${student.name}</td>

                <td>${student.course}</td>

                <td>${student.marks}</td>

                <td>${getGrade(student.marks)}</td>

                <td>

                    <button 
                        class="edit"
                        onclick="editStudent(${i})">
                        Edit
                    </button>

                    <button 
                        class="delete"
                        onclick="deleteStudent(${i})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    }


    // Update total students
    document.getElementById("total").innerText = students.length;


    // Calculate average marks
    let sum = 0;

    for (let i = 0; i < students.length; i++) {
        sum += students[i].marks;
    }

    if (students.length > 0) {
        let avg = sum / students.length;

        document.getElementById("average").innerText =
            avg.toFixed(2);
    }
    else {
        document.getElementById("average").innerText = "0";
    }
}


// Delete student
function deleteStudent(index) {

    students.splice(index, 1);

    showStudents();
}


// Search student
function searchStudent() {

    let search = document
        .getElementById("search")
        .value
        .toLowerCase();


    let table = document.getElementById("studentList");

    table.innerHTML = "";


    for (let i = 0; i < students.length; i++) {

        let student = students[i];


        if (
            student.name.toLowerCase().includes(search) ||
            student.roll.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
                <tr>

                    <td>${student.roll}</td>

                    <td>${student.name}</td>

                    <td>${student.course}</td>

                    <td>${student.marks}</td>

                    <td>${getGrade(student.marks)}</td>

                    <td>
                        <button class="edit">
                            Edit
                        </button>

                        <button 
                            class="delete"
                            onclick="deleteStudent(${i})">
                            Delete
                        </button>
                    </td>

                </tr>
            `;
        }
    }
}


// Edit student
function editStudent(index) {

    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;

    // Delete old student
    students.splice(index, 1);

    showStudents();
}