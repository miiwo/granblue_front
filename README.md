<p align="center">
    <img alt="banner pic here" src="public/ct_logo.png" width="110" style="border-radius: 45%" />
</p>

<h1 align="center">
  GBF Damage Calculator Website
</h1>
<p align="center">
  A website for GBF to calculate the damage formula. Useful for those to plan what resources to invest in!
</p>
<p align="center">
  <a href="https://skyfaring-domain.xyz">
    Link to website here!
  </a>
</p>

## Features
- Search for weapons in the game
- Calculator that determines mod strength for weapons that a player doesn't own
- Responsive Design with mobile-first mindset

## Dev Installation
1. Clone this repo.
2. Use node package manager of choice to install dependencies.
3. Run the `dev` script in `package.json` with your node package manager of choice.

Code and view changes in real-time at `http://localhost:3000` on any browser.

## Docker Image
Ensure you have Docker CE installed on your host machine.

`docker build -f Dockerfile.dev -t gbf-webapp:dev .`

`docker run -d -p <port>:<port> gbf-webapp:dev`

## Issues?
If there are any issues, please [raise an issue](https://github.com/miiwo/granblue_front/issues) on the project page, and I'll look into it!

## Screenshots
![-insert screenshot 1=](public/calculator_full_no_dot.png)

## License
MIT

