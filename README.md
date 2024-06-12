# Campground
## Summary
Campground is a free, self-hosted, and open source chat application.
This direction will provide users:
- Full ownership of their communities
- Privacy from invasive global moderation
- Peace of mind to manage communities based on their local jurisdiction
- Ability to meaningfully contribute to the project

## Glossary
### Centralised Platform
A social media platform existing only on instances managed by the social media company or group itself. All of these instances and servers mirror each other, which produces the experience of one single “portal”. There is no ability for users to create their own instance on a server they have purchased.

Examples include:
- Facebook
- Twitter
- Reddit
- Tumblr

### Federated Platform
A social media platform in which a user can decide to host their own section or piece of the application with their own server and their own rules. These can also be referred to as distributed social networks or decentralised social networks.

One example of a federated platform is Mastodon

### Campsite
An instance of a community that is hosted within our application. This would be similar to a Discord Server/Guild or a Guilded Server. Campsites can contain a Bulletin Board (profile via bluesky), Campers (from a user registry) and Campfires (categories).

### Home
The campsite that a camper has registered their user data with.
By default, this is the campsite that the camper has originally registered with.
A camper can change their home at any time, provided that the original home and desired home are both online.
When a camper is removed from a campsite, their camper data is not deleted from the camper registry. Instead, the camper's data is held until they move their home to another campsite. Prior to this, campsite owners are unable to delete the camper's data from the registry using the Campground UI.

### Bulletin Board
The campsite overview, similar to Guilded's server overview section.
This will contain announcements, active tents, and a "getting started" section for the campsite.

### Campfire
A section of tents, most similar to how Guilded “Groups” work.
Campfires will contain An image descriptor, a text descriptor, and tents.

### Tent
A communication section that can fall under one of the below types:
- Announcements - Posts can only be created by the campsite's owner and anyone allowed by role. This will eventually lead to a blog-style channel, and will be connected to a real web domain once ownership is proven
- Text - Campers will be able to type messages to each other, and upload files. If the files are of an image, audio, or video type, they will be embedded
- Media - Campers upload media to a gallery-style view, allowing better use of screen space geared towards images and videos
- Forum - Campers create threads to compartmentalise or archive their communications on a topic
- Call - Campers will be able to communicate through VoIP, and optionally stream video through a camera or their screen. Each call tent will come with an embedded text channel

Tents support markdown with slate, replies, multi-replies, and file uploads of up to 50mb.

### Camper
A registration within Campground. A camper can join Campground Guilds and send messages.
The camper's data is stored in their "Home Campsite"

### Camper Registry
A glorified list of all campers within a campsite. Campers who originate from the campsite will have their profile hosted on this, where campers who originate from other campsites will have a pointer to that campsite's camper registry entry. A camper who decides to migrate their home will have their data swapped between two campsites' camper registries, so long as both campsites are currently online and responding correctly.

### Camper Profile
Information that the camper wants to disclose to other campers within Campground. This includes:
Username
Nicknames for different campsites
Joined Campsites (private Campsites will be hidden from view via API Response)
Added friends

### Community Board
A feature most similar to “server discovery” on Discord and Guilded. A simple directory of Campsites that have opted to be listed in the Community Board.

## Technology Stack
- [Golang](https://go.dev/) - Backend Library
An open-source programming language backed by Google.

- [Next.JS](https://nextjs.org/) for [React](https://react.dev/) - Frontend Core Library
A React-based framework for building web applications.
Our app is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

- [Mantine](https://mantine.dev/) for [React](https://react.dev/) - Frontend Components Library
A library of components that we can customise and implement within Next.JS.

- [React Native](https://reactnative.dev/) - Mobile Frontend
A framework that allows us to create native Android and iOS apps using React code.

- [SurrealDB](https://surrealdb.com/) - Database
A multi-model database system that allows a SQL-based language to be used

- [SeaweedFS](https://github.com/seaweedfs/seaweedfs) - File Server
A fast distributed storage system for blobs, objects, files, and data lake with an O(1) disk seek.

- [AT Protocol](https://atproto.com/) - Guild Social APIs
The social networking protocol created for Bluesky

- [Signal Protocol](https://signal.org/docs/) - Direct Message E2EE
The protocol that Signal uses for communication between users directly.

- [Weblate](https://weblate.org/en-gb/) - Translations
An open-source software that makes it easier for translators to contribute without requiring them to have technical knowledge and also making it easier to collaborate.

## Design System
We will be utilizing Material 3 for our design system.

## Branching Strategy / Testing Flow
We will be utilising the preferred branching strategy for Git repositories:
- Main - The public / production code that builds into what standard users will see
- Test - The semi-public code that builds into what beta testers will see
- Dev - The private code that builds into what developers can internally check
- Feature Branches - A set of branches created on a per-feature level

## Feature Life Cycle
Every feature will be contained within its own branch, organised within folders.
For example: 2024/screen-share.

Upon peer-review readiness, the Feature Branch will be merged into Dev with a Pull Request and documented. It will undergo an internal check process to ensure stability.

Upon beta testing readiness, the Feature Branch will be merged into Test with a Pull Request, and the documentation will be updated to reflect this.

Upon readiness to release publicly, the Feature Branch will be merged into Main with a Pull Request, and the feature will be closed. Additionally, the Main branch will be merged via Pull Request to Test, Dev, and other open Feature Branches to ensure all code is accounted for.

Upon rolling back a change, the corresponding latest merge branch will be deleted and recreated from the level above it, merging Feature Branches that are documented. If a feature already merged into Main is required to be rolled back, we must first Pull Request from Main to the original Feature Branch, then create Revert Commits from the original Feature Branch (to ensure no commit is missed), and Pull Request from the original Feature Branch back into Main

Example 1:
- Features A, B, and C are in Dev
- Features A and B are in Test
- Feature A must be rolled back
- Test is deleted, and recreated from Main
- Feature B is merged into Test via Pull Request

Example 2:
- Features A, B, and C are in Dev
- Feature A is in Test
- Feature C must be rolled back
- Dev is deleted, and recreated from Test
- Feature B is merged into Dev via Pull Request

Example 3:
- Features A, B, and C are in Main
- Features D and E are in Test
- Feature F is in Dev
- Feature B must be rolled back
- Main is merged into Feature B via Pull Request
- Developer creates Revert Commits in Feature B for all commits relevant to Feature B's implementation
- Feature B (with revert commits) is merged back into Main via Pull Request

Example 4:
- Features A, B, and C are in Main
- Features D and E are in Test
- Feature F is in Dev
- Feature A must be rolled back, but cannot be reverted because Feature B depends on it
- Developer creates a new feature branch with the purpose of rolling back Feature A without impacting Feature B
- As such, this is treated as a new development item, rather than a simple rollback.

## Core Philosophy
We will constantly strive for these core pillars first and foremost, always in this order:
1. Stability
It should work fully before it's made live, and it shouldn't negatively contribute to the app in any way.
2. Security
It should not open up vulnerabilities related to a design flaw or the application itself.
3. Peace of mind
It should not cause any unjust stress or unnecessarily shift responsibility to other parties.
4. Flair
It should look modern and feel polished, while still retaining functional designs.
5. Adaptation
It should strive to change with the times, not stagnating.

The biggest pitfalls of other similar apps surround these pillars, which once were a portion of its original product design. Here are examples of how they fall into these issues today:
- Consistently creating features that break their own client, causes performance issues, and frequently opens up security issues
- New themes breaking old themes
- Hardware Acceleration making app transparent and appear blocky
- Lack of Hardware Acceleration making app unstable in functionality
- New features cause increased RAM usage
- Heavily utilising CPU or GPU usage to make up for unoptimized code
- Constantly blaming users who get hacked when scammers find a bypass to a security measure.
- Middle-clicking embeds skipping URL previews
- No option to show/hide URL of embeds
- The ability to have external applications or bots join a server without your authorization
- Not educating users on how to spot phishing
- Global app moderators put all responsibility on server owners, and more recently other members, to ensure people don't break rules.
- People lying on age gates for servers with content that may be controversial or adult in nature will result in the server being terminated
- Bad actors can terminate a server within minutes by posting bad content
- Strange over-enforcement and under-enforcement of rules
- Original designs didn't factor add-ons, resulting in clutter.
- Server discovery buttons
- Storefronts within the chat application
- Friends list functions being added last-minute or post-launch
- Cluttered settings screens
- Redesigns to existing layouts without proper A/B testing or feedback opportunities
- New features that step backwards rather than forwards.
- Locking previously free features behind pay-gates
- Selling content unrelated to the core application
- Pushing advertisements where they did not exist prior

We don't plan to ever go public nor corporate.
We don't believe in changing terms on people, and we don't believe in beating around the bush.
What you see is what you get, and it will always be that way.
The moment this is ever removed from our motto, we don't deserve any user base. Period.

## Dependency Management
When given the choice between losing support of deprecated systems or holding back the advancement of alternative or newer systems, we will choose the latter. For example, if support for Windows 7 ends on a dependency, but the update also enables better Linux support, we would opt to end Windows 7 support.

## Getting Started
How to run the development server on [http://localhost:3000](http://localhost:3000):
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Entry page: `app/page.tsx`

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
