class Stats {
  constructor(sparrowbot) {
    this.controller = sparrowbot.controller;
    this.client = sparrowbot.intercomClient;
  }

  buildAttachment(unassignedCount, assignments) {
    let fields = [];
    fields.push({ title: 'Unassigned', value: unassignedCount, short: true });

    const memberStats = assignments.map(member => ({
      title: member.name,
      value: member.open,
      short: true,
    }));
    if (memberStats) {
      fields = fields.concat(memberStats);
    }

    return { fields };
  }

  run() {
    this.controller.hears('stats', ['direct_message', 'direct_mention', 'mention'], (bot, msg) => {
      const fetchUnassignedCount = this.client.counts.conversationCounts()
          .then(r => r.body.conversation.unassigned);
      const fetchAdminAssignedCount = this.client.counts.conversationAdminCounts()
          .then(r => r.body.conversation.admin.filter(v => v.open > 0));

      Promise.all([fetchUnassignedCount, fetchAdminAssignedCount]).then((r) => {
        // console.log(this.buildAttachment(r[0], r[1]));
        bot.say({
          channel: msg.channel,
          text: 'This is the current open conversation :mailbox_with_mail:',
          attachments: [this.buildAttachment(r[0], r[1])],
        });
      });
    });
  }
}

module.exports = Stats;
