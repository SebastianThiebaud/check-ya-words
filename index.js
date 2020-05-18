/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
const fs = require('fs');

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on(['pull_request', 'pull_request', 'pull_request_review', 'check_run.rerequested'], check)

  let rawdata = fs.readFileSync('verbs.json');
  let verbs = JSON.parse(rawdata);

  async function check (context) {
    const timeStart = new Date()

    first_word = context.payload.pull_request.title.firstWord().toLowerCase();
    is_a_verb = (verbs.indexOf(first_word) > -1);

    const conclusion = is_a_verb ? 'success' : 'failure'

    var title = ""

    if (is_a_verb) {
      title = "Pull request title is valid"
    } else {
      title = 'Use the imperative mood in the pull request title'
    }


    return context.github.checks.create(context.repo({
      name: 'Diane',
      head_branch: context.payload.pull_request.head.ref,
      head_sha: context.payload.pull_request.head.sha,
      status: 'completed',
      started_at: timeStart,
      conclusion: conclusion,
      completed_at: new Date(),
      output: {
        title: title,
        summary: title
      }
    }))
  }
}

String.prototype.firstWord = function(){ return this.replace(/\s.*/,'') }
function arrayContains(needle, arrhaystack) { return (arrhaystack.indexOf(needle) > -1); }