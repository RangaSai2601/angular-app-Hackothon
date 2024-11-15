import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-gen-ai-populate',
  templateUrl: './gen-ai-populate.component.html',
  styleUrls: ['./gen-ai-populate.component.css']
})
export class GenAiPopulateComponent implements OnInit {

  @Input() formFieldsData:any = [];
  recognition: any;
  userSpeech: string = '';
  resultJson: any = { 'hiring manager': '', 'department name': '', 'requisition status': '', 'sort by': '', 'date range': { 'from': '', 'to': '' } };
  initialJson: any = { 'hiring manager': '', 'department name': '', 'requisition status': '', 'sort by': '', 'date range': { 'from': '', 'to': '' } };

  conversation: any[] = []
  
  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {

    this.conversation.push({
      role:"system",
      content: `You are tasked with assisting the user in filling out a form, with form fields described by the following data: ${this.formFieldsData}. Your job is to collect this data from the user by asking questions one at a time. Please follow these guidelines:

        1. Detect the language of the user’s input and respond in the same language.
        2. Each time you receive a message from the user, capture any values that can be used to fill in the form fields.
        3. Correct any grammatical errors in the captured values.
        4. Populate the corrected value in the 'value' property of the corresponding field object.
        5. At the end of each response, append an array of field objects whose 'value' properties have been updated based on the latest user input. If no fields have been populated, return an empty array.
        6. When all mandatory fields have been populated, inform the user that the form is ready for submission.
        7. Whenever a field is filled in, inform the user that the specific field has been populated.`
    });

    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();

      // Configure the recognition instance
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      // Event listeners
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        this.conversation.push({
          role: "user",
          content: transcript
        });

        this.getGptResponse(transcript).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data && res.data.results[0]) {
              // this.resultJson = JSON.parse(res.data.results[0]);
              this.conversation.push({
                role: "assistant",
                content: res.data.results[0]
              });
              this.cdRef.detectChanges();
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      };

      this.recognition.addEventListener('result', (e: any) => {
        this.userSpeech = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        this.cdRef.detectChanges()
      });

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      this.recognition.onend = () => {
        console.log('Speech recognition service disconnected');
      };
    } else {
      console.error('webkitSpeechRecognition is not supported in this browser.');
    }
  }

  getGptResponse(prompt: string): any {
    const url = "http://services.test2.ff-services-test2.cluster.infoedge.com/prompt-execute-services/prompts/open-ai/chat/completions";
    let headers = new HttpHeaders({
      'AppId': "123", "SystemId": 123,
      "templateCode": "ZWAYAM_VOICE_PROMPT_BASED_ASSISTANT", 
      "key": "be862e28064ce368fb9a6016aa71f41d8d53213a9acc6d9cdefa00fc3772d206ae410243244b3aa231b890266d0ecd01",
      "Content-Type": "application/json"
    });

    let data: any = {
      metadata: {
        "model": "gpt-4",
        "temperature": 1,
        "max_tokens": 3000,
        "resultCount": 1
      },
      messages: this.conversation
    }
    return this.http.post(url, JSON.stringify(data), { headers });
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
      console.log('Listening for speech...');
    }
  }

  makeUniqueFieldName(fieldName: string): string {
    const regex = /[^a-zA-Z0-9_\s]/g;
    let removedOtherChars = fieldName.replace(regex, (match) => (match === ' ' ? '_' : ''));
    return removedOtherChars.replace(/\s/g, '_');
  }

}
