



import React from 'react';

class DownloadDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
    };
  }

  handleChange = (event) => {
    this.setState({ hash: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { hash } = this.state;
    window.location.href = `https://ipfs.io/ipfs/${hash}`;
    // You can customize the URL to use a different IPFS gateway if desired.
    // For example: `https://gateway.ipfs.io/ipfs/${hash}`
  };

  render() {
    const { hash } = this.state;
    return (
      <div className="max-w-lg mx-auto py-3 space-y-3 text-center">
        <form onSubmit={this.handleSubmit}>
          <label className="text-lg font-medium text-white">
            IPFS Hash:
            <input type="text" value={hash} onChange={this.handleChange} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
          </label>
          <button type="submit" className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 mt-7 rounded-full">Download</button>
        </form>
      </div>
    );
  }
}

export default DownloadDocument;
