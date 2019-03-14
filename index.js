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
          next: 'q1a1'
        }, {
          id: 'b', text: 'No, I would not be interested in visiting it at all',
          next: 'q1b1'
        }]
      },
      q1a1: {
        text: 'In what capacity would you want to visit it?',
        type: 'checks',
        options: [{
          id: 'a', text: 'For a site tour'
        }, {
          id: 'b', text: 'To stay one or more nights'
        }, {
          id: 'c', text: 'To rent it out for an event (company, wedding, etc)'
        }, {
          id: 'd', text: 'Other (please specify)',
          comments: true
        }],
        next: 'q1a2'
      },
      q1a2: {
        text: 'Would you participate in a fundraiser to hasten the construction of Bag End?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes, I would pay money to a fundraiser for something in return.',
          next: 'q1a2a1'
        }, {
          id: 'b', text: 'No, I would not participate in a fundraiser but I could still see myself visiting or staying.',
          next: 'q1a3'
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
          id: 'a', text: 'I would want to visit'
        }, {
          id: 'b', text: 'I would want to enter in a queue so when it\'s ready I could book my stay'
        }, {
          id: 'c', text: 'I would want to register a large event there'
        }],
        next: 'q1a2a2'
      },
      q1a2a1b1: {
        text: 'Check all that apply',
        type: 'checks',
        options: [{
          id: 'a', text: 'I would still support it financially for something smaller in return'
        }, {
          id: 'b', text: 'I would still support it financially because if possible I would want to visit it in the future'
        }],
        next: 'q1a2a2'
      },
      q1a2a2: {
        text: 'What\'s the earliest point in the process would you join the fundraising campaign?',
        type: 'radio',
        options: [{
          id: 'a', text: 'At any point'
        }, {
          id: 'b', text: 'After every single thing being constructed has detailed plans (the main structure, trimming, 100+ pieces of furniture, etc)'
        }, {
          id: 'c', text: '... and after a good portion of the furniture is already assembled'
        }, {
          id: 'd', text: '... and after the piece of land has been purchased'
        }, {
          id: 'e', text: '... and after construction of the main structure has started'
        }, {
          id: 'f', text: '... and once Bag End is mostly completed'
        }],
        next: 'q1a2a3'
      },
      q1a2a3: {
        text: 'Would you like to receive email updates on the probability of a fundraising campaign?',
        type: 'radio', 
        options: [{
          id: 'a', text: 'Yes (please enter email below)',
          comments: true
        }, {
          id: 'b', text: 'No thank you'
        }],
        next: 'q1a3'
      },
      q1a3: {
        text: 'Would you follow the process of planning and building it on Twitter, YouTube, and/or Instagram?',
        type: 'radio',
        options: [{
          id: 'a', text: 'Yes',
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
          id: 'b', text: 'No'
        }],
        submit: true
      },
      q1b1: {
        text: 'Why wouldn\'t you be interested?',
        type: 'checks',
        options: [{
          id: 'a', text: 'I\'m not that big of a fan'
        }, {
          id: 'b', text: 'The location is too far away'
        }, {
          id: 'c', text: 'Other (please specify)',
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

      var results = {};
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

              gtag('event', o.text, {
                event_category: q.text,
                event_label: comments
              });
            }
          }
  
          if (selected.length > 0) {
            results[q.text] = selected;
          }
        }
      }

      console.log(results);
    }
  }
})