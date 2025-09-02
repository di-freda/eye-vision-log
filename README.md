# Eye Vision Log 👓

🔗**URL**: https://lovable.dev/projects/4afbedc4-8fd3-42b4-b123-6b9ff80e4951

---

## Project brief 📝

I want to make a web app where I can input my history of glasses prescriptions as well as any appointments I have or follow up appointments I need to book based on any notes I add from each appointment. The interface should look minimal but also modern.
(_I decided to change this to create a retro game style, and prompted Lovable to do such. However, I was not satisfied with the design it came up with, so I decided to utilise my creative skills and design the interface the way I want it on Figma and then adjust the code accordingly_)

## Feature 🗂️

When the user opens the app, there are 3 tabs which leads to 3 separate screens:

1. Glasses/contact lens prescriptions
2. Optician appointments
3. Eye care

### Feature 1

The first screen is for glasses or contact lens prescriptions but will be labelled as “Prescription”. This screen will contain the following:

- A button labelled “+” in the lower right corner of the screen , which opens a form to add prescription details. It will ask for the prescription date, SPH, CYL and AXIS for the right and left eye and save it.
- Each saved record will be displayed in a grid layout on the “Prescription” screen.
- I also want a progress bar above where the records will be showing if the user’s eyesight is getting better or worse based on their prescription history.

### Feature 2

The second screen will be for appointments with the optician labelled as “Appointments”. It will contain the following features:

- A button labelled “+” in the lower right corner of the screen, which opens a form to add prescription details. It will asked for the appointment date, the optician (which can be a name or a business), the location and a checkbox asking if the user has attended the appointment. The record should be saved.
- Each saved record will be displayed in a grid layout on the “Appointments” screen.

### Feature 3

The third screen will be for general eye care labelled as "Eye Care". This screen will contain the following features:

- A section for storing eye health information, including any conditions or concerns noted by opticians.
- Reminders for eye care routines, such as taking breaks when using screens or replacing contact lens solutions.
- Tips and recommendations for maintaining good eye health based on the user's prescription history.


## How can I edit this code? 🔖

There are two ways to edit this code:

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.


## What technologies are used for this project? ⚙️

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
