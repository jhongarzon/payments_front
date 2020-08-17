# Overall

Overall I would consider it an okay React SPA. There were some things missing I like to see, like test coverage 
and architecturally would like to see some of the components be more Single Responsibility. It could also benefit
from some linting and a minor cleanup pass.

That being said it works and gets the job done in a short amount of time. There are some more details below.

Please also see:
- any inline comments prepended with `FEEDBACK:`
- Feedback-BE.md in the backend repository for feedback on the Rails app.

## Strengths
- Good use of Material UI
- Mobile responsive (but UI could be improved on Desktop)
- User context / hooks is good

## Improvements
- have backend webhook listener handle setting payment status (security improvement)
- could use Spraypaint (Graphiti's companion library for JS) and reduce a lot of products-api.js
- some UI tiling issues with images being different sizes / not showing name + price info
- Could use some linting / prettification
- Missing tests
