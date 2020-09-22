var meeting = [];

function loadMeetingRoutes(app) {
  app.post('/meeting-setup', function(req, res) {
    console.log('[GET] /meeting-setup');
    const location = req.body.conversation.memory.location;
    const datetime = req.body.conversation.memory.datetime;
    meeting[meeting.length] = {
      'location' : location.formatted,
      'datetime' : datetime.formatted,
      'participants' : [],
    };

    return res.json({
      replies: [
        {
          type: 'text',
          content: `The meeting number ${meeting.length} is set. It will be held in ${location.formatted} on ${datetime.formatted}.`,
        },
      ],
      conversation: { memory: req.body.conversation.memory },
    });
  });

  app.post('/meeting-list', function(req, res) {
    console.log('[GET] /meeting-list');

    var replies = [];

    replies[0] =
      {
        type: 'text',
        content: `The number of meetings is ${meeting.length}.`,
      };

    for (let i = 0; i < meeting.length; i++) {
      replies[replies.length] = {
        type: 'text',
        content: `${i+1}) Meeting will be held in ${meeting[i].location} on ${meeting[i].datetime}. participants: ${meeting[i].participants}.`,
      };
    }

    return res.json({
      replies: replies,
      conversation: { memory: req.body.conversation.memory },
    });
  });

  app.post('/meeting-attend', function(req, res) {
    console.log('[GET] /meeting-attend');
    const person = req.body.conversation.memory.person;
    const number = req.body.conversation.memory.number.scalar - 1 ;
    meeting[number].participants[meeting[number].participants.length] = person.fullname;

    return res.json({
      replies: [
        {
          type: 'text',
          content: `The number of participants who will be attending is ${meeting[number].participants.length}. The list includes ${meeting[number].participants}.`,
        },
      ],
      conversation: { memory: req.body.conversation.memory },
    });
  });

}
module.exports = loadMeetingRoutes;
