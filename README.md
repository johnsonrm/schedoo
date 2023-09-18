# Monthly

A simple Angular based app to track and manage a daily routine schedule and goals for multiple timeframes, e.g. weekly, monthly, and annual.

## App Plan

### Features

#### Feature: Daily Routine

- A manageable schedule for a daily routine

#### Feature: Annual Goals

- Highest level goals for the overall calendar year

#### Feature: Monthly Goals

- Summary level goals for by month

#### Feature: Weekly Goals

- Week by week goals.  These are more like tasks.

#### Feature: Dashboard

- A high level presentation of all currently relevant goals along with the daily and weekly routine.

#### Models

- Daily Routine Schedule Item (time, duration, description)
- Weekly Routine Schedule Item (day of week, description, status)
- Annual Goal (date (year), description, status)
- Monthly Goal (date (year and month), description, status)
- Weekly Goal (date (Start date of week), description, status)

### Services

- Routine Schedule Service - generally handles data operations for routine schedules
- Goal Service - generally handles data operations for goals

### Components

- Daily Routine
- Weekly Routine
- Annual Goals
- Monthly Goals
- Weekly Goals

### TODO

- Make the dashboard actionable, i.e. allow for quick edits like completely goals and routine items
- Add affirmations, rules, and journaling
