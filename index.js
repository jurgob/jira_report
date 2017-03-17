var JiraApi = require('jira-client');


var jira = new JiraApi({
  protocol: 'https',
  host: process.env.JIRA_HOST,
  username: process.env.JIRA_USER,
  password: process.env.JIRA_PASS,
  apiVersion: '2',
  strictSSL: true
});

var jqlQuery = "assignee = currentUser() and Sprint in  openSprints() and status = closed"
jira.searchJira(jqlQuery)
  .then(resp => {
    const res = resp.issues
      .map(t => ({key:t.key, summary: t.fields.summary   }))
      .forEach(t => console.log(`${t.key} - ${t.summary}`   ))
  })
  .catch(err => {
    console.error(err);
  });