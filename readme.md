# Job Portal Application

This is a Job Portal Application that is built using React for the frontend and Node.js with Express for the backend. The application allows users to browse job listings, apply for jobs, and manage their profiles.

# Features

User Features:

- User Registration and Login
- Browse Job Listings
- Search and Filter Jobs
- Apply for Jobs
- View Application Status
- User Profile Management

Recruiter Features:

- Recruiter Login
- Post Job Listings for the Company he/she has been assigned to.
- Manage Job Listings (Create, Update, View)
- View Applicants for Posted Jobs
- Update Application Status

Admin Features:

- Admin Login
- Manage Companies (Create, Update, View, Delete)
- Manage Recruiters (Create, Update, View, Delete)
- Assign Recruiters to Companies

## Steps to Develop the application

- Setup Git and GitHub.
- NPM intialization.
- Mongodb setup
- Express server setup

Example Company Create Request:

<!-- reference: const { name, description, website, industry, location, size, foundedYear } = req.body; -->

3 examples:

```json
{
  "name": "Tech Innovators",
  "description": "A leading company in tech innovations.",
  "website": "https://www.techinnovators.com",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "size": "500-1000",
  "foundedYear": 2010
}
```

```json
{
  "name": "Health Solutions",
  "description": "Providing innovative health solutions worldwide.",
  "website": "https://www.healthsolutions.com",
  "industry": "Healthcare",
  "location": "New York, NY",
  "size": "201-500",
  "foundedYear": 2005
}
```

```json
{
  "name": "Eco Ventures",
  "description": "Focused on sustainable and eco-friendly ventures.",
  "website": "https://www.ecoventures.com",
  "industry": "Environmental Services",
  "location": "Austin, TX",
  "size": "11-50",
  "foundedYear": 2015
}
```
