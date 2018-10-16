using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Lecture
/// </summary>
public class Lecture
{
    public int LectureID { get; set; }
    public Course Course { get; set; }
    public Department Department { get; set; }
    public int LecturerID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Class Class { get; set; }
    public string LectureDate { get; set; }
    public string BeginHour { get; set; }
    public string EndHour { get; set; }
    public int StatusID { get; set; }
    public string StatusName { get; set; }
    public bool IsActive { get; set; }
    public string TimeStarted { get; set; }
    public float Longitude { get; set; }
    public float Latitude { get; set; }
    public string Distance { get; set; }
    public string TimeOfTimer { get; set; }

    public Lecture(int lectureID, int departmentID, string departmentName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour)
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
    }


    public Lecture(int lectureID, int departmentID, string departmentName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, bool isActive, string timeStarted)
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        IsActive = isActive;
        TimeStarted = timeStarted;
    }

    public Lecture(int lectureID, int departmentID, string departmentName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, bool isActive, string timeStarted , string distance , string timeOfTimer )
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        IsActive = isActive;
        TimeStarted = timeStarted;
        Distance = distance;
        TimeOfTimer = timeOfTimer;
    }


    public Lecture(int lectureID, int departmentID, string departmentName, int lecturerID, string firstName, string lastName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, int statusID, string statusName)
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        LecturerID = lecturerID;
        FirstName = firstName;
        LastName = lastName;
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        StatusID = statusID;
        StatusName = statusName;
    }

    public Lecture(int lectureID, int departmentID, string departmentName, int lecturerID, string firstName, string lastName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, int statusID, string statusName, bool isActive, string timeStarted)
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        LecturerID = lecturerID;
        FirstName = firstName;
        LastName = lastName;
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        StatusID = statusID;
        StatusName = statusName;
        IsActive = isActive;
        TimeStarted = timeStarted;
    }




    public Lecture(int lectureID, int departmentID, string departmentName, int lecturerID, string firstName, string lastName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, int statusID, string statusName, bool isActive, string timeStarted ,float longitude ,float latitude)
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        LecturerID = lecturerID;
        FirstName = firstName;
        LastName = lastName;
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        StatusID = statusID;
        StatusName = statusName;
        IsActive = isActive;
        TimeStarted = timeStarted;
        Longitude = longitude;
        Latitude = latitude;
    }


    public Lecture(int lectureID, int departmentID, string departmentName, int lecturerID, string firstName, string lastName, int courseID, string courseName, string openDate, string endDate, int classID, string className, string lectureDate, string beginHour, string endHour, int statusID, string statusName, bool isActive, string timeStarted, float longitude, float latitude,  string distance ,string timeOfTimer )
    {
        LectureID = lectureID;
        Course = new Course(courseID, courseName, openDate, endDate);
        Department = new Department(departmentID, departmentName);
        LecturerID = lecturerID;
        FirstName = firstName;
        LastName = lastName;
        Class = new Class(classID, className);
        LectureDate = lectureDate;
        BeginHour = beginHour;
        EndHour = endHour;
        StatusID = statusID;
        StatusName = statusName;
        IsActive = isActive;
        TimeStarted = timeStarted;
        Longitude = longitude;
        Latitude = latitude;
        Distance = distance;
        TimeOfTimer = timeOfTimer;
    }

}