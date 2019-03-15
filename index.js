new Vue({
  el: '#app',
  data: {
    path: [],
    input: {},
    submitted: false,
    current: null,
    currentInput: {},
    question: 'q1',
    questions: {
      q1: {
        text: 'If there was an exact interior and exterior replica of Bag End as seen in the movies in Pennsylvania US, would you be interested in visiting it?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes, I would want to visit it in some capacity',
          next: 'q1a1',
          event: 'Interested - Yes',
          property: 'interested_yes'
        }, {
          id: 'b', text: 'No, I would not be interested in visiting it at all',
          next: 'q1b1',
          event: 'Interested - No',
          property: 'interested_no'
        }]
      },
      q1a1: {
        text: 'In what capacity would you want to visit it?',
        type: 'checks',
        options: [{
          id: 'a', text: 'For a site tour',
          event: 'Interested - Tour',
          property: 'interested_tour'
        }, {
          id: 'b', text: 'To stay one or more nights',
          event: 'Interested - Stay',
          property: 'interested_stay'
        }, {
          id: 'c', text: 'To rent it out for an event (company, wedding, etc)',
          event: 'Interested - Event',
          property: 'interested_event'
        }, {
          id: 'd', text: 'Other (please specify)',
          event: 'Interested - Other',
          property: 'interested_other',
          comments: true
        }],
        next: 'q1a2'
      },
      q1a2: {
        text: 'Would you participate in a fundraiser to hasten the construction of Bag End?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes, I would pay money to a fundraiser for something in return.',
          next: 'q1a2a1',
          event: 'Fundraise - Yes',
          property: 'fundraise_yes'
        }, {
          id: 'b', text: 'No, I would not participate in a fundraiser but I could still see myself visiting or staying.',
          next: 'q1a3',
          event: 'Fundraise - No',
          property: 'fundraise_no'
        }]
      },
      q1a2a1: {
        text: 'If the fundraising platform allowed you to book visits/stays/events in advance, would you?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes',
          next: 'q1a2a1a1'
        }, {
          id: 'b', text: 'No',
          next: 'q1a2a1b1'
        }]
      },
      q1a2a1a1: {
        text: 'Check all that apply',
        type: 'checks',
        options: [{
          id: 'a', text: 'I would want to visit',
          event: 'Fundraise - Visit',
          property: 'fundraise_visit'
        }, {
          id: 'b', text: 'I would want to enter in a queue so when it\'s ready I could book my stay',
          event: 'Fundraise - Stay',
          property: 'fundraise_stay'
        }, {
          id: 'c', text: 'I would want to register a large event there',
          event: 'Fundraise - Event',
          property: 'fundraise_event'
        }],
        next: 'q1a2a2'
      },
      q1a2a1b1: {
        text: 'Check all that apply',
        type: 'checks',
        options: [{
          id: 'a', text: 'I would still support it financially for something smaller in return',
          event: 'Fundraise - No - Small',
          property: 'fundraise_no_small'
        }, {
          id: 'b', text: 'I would still support it financially because if possible I would want to visit it in the future',
          event: 'Fundraise - No - Potential',
          property: 'fundraise_no_potential'
        }],
        next: 'q1a2a2'
      },
      q1a2a2: {
        text: 'What\'s the earliest point in the process would you join the fundraising campaign?',
        type: 'radio',
        options: [{
          id: 'a', text: 'At any point',
          event: 'Support - Anytime',
          property: 'support_anytime'
        }, {
          id: 'b', text: 'After every single thing being constructed has detailed plans (the main structure, trimming, 100+ pieces of furniture, etc)',
          event: 'Support - Planned',
          property: 'support_planned'
        }, {
          id: 'c', text: '... and after a good portion of the furniture is already assembled',
          event: 'Support - Furniture',
          property: 'support_furniture'
        }, {
          id: 'd', text: '... and after the piece of land has been purchased',
          event: 'Support - Land',
          property: 'support_land'
        }, {
          id: 'e', text: '... and after construction of the main structure has started',
          event: 'Support - Started',
          property: 'support_started'
        }, {
          id: 'f', text: '... and once Bag End is mostly completed',
          event: 'Support - Mostly',
          property: 'support_mostly'
        }],
        next: 'q1a2a3'
      },
      q1a2a3: {
        text: 'Would you like to receive email updates on the probability of a fundraising campaign?',
        type: 'radio', 
        options: [{
          id: 'a', text: 'Yes (please enter email below)',
          event: 'Updates - Yes',
          property: 'updates_yes',
          comments: true
        }, {
          id: 'b', text: 'No thank you',
          event: 'Updates - No',
          property: 'updates_no'
        }],
        next: 'q1a3'
      },
      q1a3: {
        text: 'Would you follow the process of planning and building it on Twitter, YouTube, and/or Instagram?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes',
          event: 'Follow - Yes',
          property: 'follow_yes',
          info: '<ul>' + 
            '<li>' + 
              '<a class="text-light" href="https://www.youtube.com/channel/UCWUFdr-3OqNJ0QpV2jxCDfw" target="_blank">YouTube</a>' +
            '</li>' + 
            '<li>' +
              '<a class="text-light" href="https://twitter.com/bagendbuilder" target="_blank">Twitter</a>' +
            '</li>' + 
            '<li>' +
              '<a class="text-light" href="https://www.instagram.com/bagendbuilder/" target="_blank">Instagram</a>' +
            '</li>' + 
            '</ul>'
        }, {
          id: 'b', text: 'No',
          event: 'Follow - No',
          property: 'follow_no'
        }],
        submit: true
      },
      q1b1: {
        text: 'Why wouldn\'t you be interested?',
        type: 'checks',
        options: [{
          id: 'a', text: 'I\'m not that big of a fan',
          event: 'No - Not Fan',
          property: 'no_not_fan'
        }, {
          id: 'b', text: 'The location is too far away',
          event: 'No - Too Far',
          property: 'no_too_far'
        }, {
          id: 'c', text: 'Other (please specify)',
          event: 'No - Other',
          property: 'no_other',
          comments: true
        }],
        submit: true
      }
    }
  },
  computed: {
    hasNext: function() {
      return !!this.getFirstSelectedWithNext();
    },
    hasPrev: function() {
      return this.path.length > 0;
    },
    showQuestion: function() {
      return this.current && !this.submitted;
    }
  },
  watch: {
    question: {
      immediate: true,
      handler: function(id) {
        var q = this.questions[id];
        this.$set(this.input, id, this.getNewInputForQuestion(q));
        this.current = q;
        this.currentInput = this.input[id];
      }
    }
  },
  methods: {
    getNewInputForQuestion: function(q) {
      var input = {};
      switch (q.type) {
        case 'radio':
          input.value = null;
          break;
        case 'checks':
          for (var i = 0; i < q.options.length; i++) {
            var o = q.options[i];
            input[o.id] = o.defaultValue || false;
          }
          break;
      }
      for (var i = 0; i < q.options.length; i++) {
        var o = q.options[i];
        if (o.comments) {
          input[o.commentProperty || (o.id + '_comments')] = '';
        }
      }
      return input;
    },
    isSelected: function(optionId, question, input) {
      var selected = false;
      switch (question.type) {
        case 'checks':
          selected = input[optionId];
          break;
        case 'radio':
          selected = input.value === optionId;
          break;
      }
      return selected;
    },
    getFirstSelectedWithNext: function() {
      return this.getSelectedWithNext()[0];
    },
    getSelectedWithNext: function() {
      var curr = this.current;
      var options = curr.options;
      var selected = [];
      var selectedCount = 0;
      for (var i = 0; i < options.length; i++) {
        var o = options[i];
        if (this.isSelected(o.id, curr, this.currentInput)) { 
          selectedCount++;
          if (o.next) {
            selected.push(o);
          }
        }
      }
      if (curr.next && selectedCount > 0) {
        selected.push(curr);
      }
      return selected;
    },
    next: function() {
      var option = this.getFirstSelectedWithNext();
      if (option && option.next in this.questions) {
        this.path.push(this.question);
        this.question = option.next;
      }
    },
    prev: function() {
      if (this.hasPrev) {
        this.question = this.path.pop();
      }
    },
    submit: function() {
      this.submitted = true;

      var config = {
        apiKey: "AIzaSyDkNoljRv5piuUj1s-GfwxjHXHO8zF2bPw",
        authDomain: "bag-end-survey-interest.firebaseapp.com",
        databaseURL: "https://bag-end-survey-interest.firebaseio.com",
        projectId: "bag-end-survey-interest",
        storageBucket: "bag-end-survey-interest.appspot.com",
        messagingSenderId: "458239709372"
      };
      firebase.initializeApp(config);

      var db = firebase.firestore();

      var results = {};
      var props = {};
      for (var questionId in this.questions) {
        var q = this.questions[questionId];
        var i = this.input[questionId];
        
        if (i) {
          var selected = [];

          for (var k = 0; k < q.options.length; k++) {
            var o = q.options[k];
            if (this.isSelected(o.id, q, i)) {
              var text = o.text;
              var comments = o.comments ? i[o.id + '_comments'] : '';
              if (comments) {
                text += ': ' + comments;
              }
              selected.push(text);

              if (o.event) {
                gtag('event', o.event, {event_label: comments});
              }
              if (o.property) {
                props[o.property] = comments || true;
              }
            }
          }
  
          if (selected.length > 0) {
            results[q.text] = selected;
          }
        }
      }

      gtag('event', 'Submitted');

      db.collection('surveys').add(props);

      var summary = db.collection('surveys').doc('summary');

      props.submitted = true;

      db.runTransaction(function(tx) {
        return tx.get(summary).then(function(doc) {
          var updates = {};
          var data = doc.data();
          for (var property in props) {
            updates[property] = data[property] + 1;
          }
          tx.update(summary, updates);
        });
      });

      console.log(results);
    }
  }
})