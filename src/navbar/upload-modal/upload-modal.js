import React from 'react';
import apiService from '../../services/api-service.js';

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { author: '', password: '', fileUploaded: false, botName: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "file") {
      return this.setState({ fileUploaded: this.fileInput !== undefined });
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('file', this.fileInput.files[0]);
    data.append('author', this.state.author);
    data.append('password', this.state.password);
    data.append('botName', this.state.botName);

    apiService.uploadBot(data)
      .then(function (response) {
        document.querySelector('#submit-modal-close').click()
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="modal" id="upload-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload Bot</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">


              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input name='author' className="form-control" value={this.state.author} onChange={this.handleChange} id="author-name" placeholder="Author Name" required />
                </div>
                <div className="form-group">
                  <input name='botName' className="form-control" value={this.state.botName} onChange={this.handleChange} id="bot-name" placeholder="Bot Name" required />
                </div>
                <div className="form-group">
                  <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" required />
                </div>
                <div className="form-group">
                  <div className="custom-file">
                    <input name="file" type="file" accept=".js" ref={input => {
                      this.fileInput = input;
                    }} onChange={this.handleChange} className="custom-file-input" id="bot-code" required />
                    <label className="custom-file-label" htmlFor="bot-code">{this.state.fileUploaded ? "File selected" : "Select .js file"}</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input type="submit" value="Upload" className="btn btn-primary"></input>
                  <button type="button" id="submit-modal-close" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default UploadModal;