import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'API_key_test';
  recognition: any;
  resultJson: any = { 'hiring manager': '', 'department name': '', 'requisition status': '', 'sort by': '', 'date range': { 'from': '', 'to': '' } };
  initialJson: any = { 'hiring manager': '', 'department name': '', 'requisition status': '', 'sort by': '', 'date range': { 'from': '', 'to': '' } };

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {

  }

  getGptResponse(prompt: string): any {
    const url = "http://services.test2.ff-services-test2.cluster.infoedge.com/prompt-execute-services/prompts/open-ai/chat/completions";
    let headers = new HttpHeaders({
      'AppId': "123", "SystemId": 123, "templateCode": "ZWAYAM_VOICE_PROMPT_BASED_ASSISTANT", "key": "be862e28064ce368fb9a6016aa71f41d8d53213a9acc6d9cdefa00fc3772d206ae410243244b3aa231b890266d0ecd01",
      "Content-Type": "application/json"
    });

    let data: any = {
      metadata: {
        "model": "gpt-4",
        "temperature": 1,
        "max_tokens": 3000,
        "resultCount": 1
      },
      messages: [
        { role: "system", 
          content: `I am using the following JSON to apply some filters on requisition list:\n
          ${JSON.stringify(this.initialJson)}\n
          Your job is to correctly identify the language of the user prompt and translate it to english with correct grammar and punctuation. 
          Then, use the processed prompt to populate the JSON with associated values.
          If none of the properties can be retrieved from the prompt, return the original JSON as it is.  
          Return only the populated JSON. In any case, the completion should not include any text other than JSON.` 
        },
        { role: "user", "content": prompt }
      ]
    }
    return this.http.post(url, JSON.stringify(data), { headers });
  }


  ngOnInit(): void {
    console.log("test");
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
        this.getGptResponse(transcript).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data && res.data.results[0]) {
              this.resultJson = JSON.parse(res.data.results[0]);
              this.cdRef.detectChanges();
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      };

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

  startListening() {
    if (this.recognition) {
      this.recognition.start();
      console.log('Listening for speech...');
    }
  }
}
