# Sparrow
### Final Project for Internet Programming CS330 @ Luther College

Flask Server {
	UserDB: username,
	ProjectDB: Project Name, Project ID, Project Description
	CommentsDB: username, projectID, comment
	UserInterests: InterestID, username
	InterestsDB: interestID, projectID
} 

ClientSide: GoogleAuth {
	request personal information module	
}

App Layout {
	Navbar:
		Create New Proposal*
			- Title
			- Description
			- Department Information
			- Especially Interested in [Department/Major/Experience]
			- Seeking $

		Home
		Search
		Google Login Toggle
	User Data:
		Your Projects*
		Projects Interested In*
		Stats*:
			Shows data about 
				- Views
				- Comments
				- Interest
				- Projected Funding

	Project Tiles:
		View Project Information
		Toggle Interest*
			- This will add project to your list
		Comments 
			- view comments
			- add comment*
		Contact User
			- mailto: username
}

Total Views {
	1. All Projects Grid
	2. Nav Bar
	3. Side Nav (Stats/Info)
	4. Submission Form
	5. Edit Submission
	6. View Submission
	7. User Data
	8. Comments View
}


^ Sergei took these notes ... well

https://kkschick.wordpress.com/2014/12/12/setting-up-the-structure-and-routing-of-an-app-using-flask-and-angularjs/

https://github.com/shea256/angular-flask/tree/master/angular_flask
