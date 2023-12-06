import logo from './logo.svg';
import './App.css';
import React from 'react';
import web3 from './web3';
//import ticketSale from './TicketSale';
import TicketSale from './TicketSale';

class App extends React.Component {
	constructor(props){
	super(props);
	this.state={
		ticketPrice : '',
     		totalTickets: '',
     		serviceFee: '',
     		TicketId: '',
     		person: '',
     		partner:'',
	};
	 this.handleChangeTicketId = this.handleChangeTicketId.bind(this);
	 this.handleChangegetTicketOf  = this.handleChangegetTicketOf.bind(this);
	 this.handleSubmitgetTicketOf= this.handleSubmitgetTicketOf.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this)
    //this.handleChangePrice = this.handleChangePrice.bind(this);
   this.handleSubmitPurchaseTicket = this.handleSubmitPurchaseTicket.bind(this);
    this.handleChangereturnTicket = this.handleChangereturnTicket.bind(this);
    this.handleSubmitreturnTicket = this.handleSubmitreturnTicket.bind(this);
    this.handleChangeofferSwap = this.handleChangeofferSwap.bind(this);
    this.handleSubmitofferSwap= this.handleSubmitofferSwap.bind(this);
    this.handleChangeacceptSwap = this.handleChangeacceptSwap.bind(this);
    this.handleSubmitacceptSwap= this.handleSubmitacceptSwap.bind(this);
  }
	 async componentDidMount(){
	const owner = await TicketSale.methods.owner().call();
	const ticketPrice = await TicketSale.methods.ticketPrice().call();
    	const totalTickets = await TicketSale.methods.totalTickets().call();
   	const serviceFee = await TicketSale.methods.serviceFee().call();
   
    	this.setState({ 'owner': owner,'ticketPrice': ticketPrice,'totalTickets': totalTickets,'serviceFee':serviceFee});
	}
	
	  handleChangeTicketId(event){
      this.setState({
     
        TicketId: event.target.value
      });
      console.log(this.state.TicketId);
 
    }
    handleChangegetTicketOf(event){
      this.setState({
       
        person: event.target.value
      });
     
    }
    handleChangereturnTicket(event){
      this.setState({
       
        partner: event.target.value
      });
    }
    handleChangeofferSwap(event){
      this.setState({
     
        offerSwap: event.target.value
      });
    }
     handleChangeacceptSwap(event){
      this.setState({
     
        acceptSwap: event.target.value
      });
    }
     handleSubmitPurchaseTicket = async (event) =>{

              event.preventDefault()
              alert(`
               ____You are buying a Ticket____\n
               Owner Address : ${this.state.owner}
               ticketPrice: ${this.state.ticketPrice}
              serviceFee : ${this.state.serviceFee}
              
             `)
      
             const accounts = await web3.eth.getAccounts();
             this.setState({ message: "Waiting on transaction success..." });

             await TicketSale.methods.buyTicket(this.state.TicketId).send({
               from: accounts[0]
             });
           }
           
  handleSubmitgetTicketOf= async (event) =>{

             event.preventDefault()
              
            
             const accounts = await web3.eth.getAccounts();
             this.setState({ message: "Waiting on transaction success..." });
            const ticket_Id = await TicketSale.methods.getTicketOf(this.state.person).call();
             alert(`
               ____this is the owner of the ticket____\n
               Ticket Id : ${ticket_Id}
             `)
           }
           
           handleSubmitreturnTicket= async (event) =>{
  		event.preventDefault();

 
  		if (!this.state.partner) {
   		 alert("Please enter a valid partner address.");
   		 return;
  		}

 		 const accounts = await web3.eth.getAccounts();
  			this.setState({ message: "Waiting on transaction success..." });

 		 try {
   			 const reject_ticket = await TicketSale.methods
      			.returnTicket(this.state.partner)
      			.send({ from: accounts[0] });

    			alert(`Ticket has been returned: ${reject_ticket}`);
  		} catch (error) {
    		console.error("Error returning ticket:", error);
    		alert("Error returning ticket. Please check the partner address.");
  		}
	};

           handleSubmitofferSwap = async (event) => {
		  event.preventDefault();
		  const accounts = await web3.eth.getAccounts();
		  this.setState({ message: "Waiting on transaction success..." });

		  try {
		    
		    const offerTransaction = await TicketSale.methods.offerSwap(this.state.partner).send({ from: accounts[0] });
		    console.log("Offer Swap Transaction Receipt:", offerTransaction);
		    alert("Offer Swap transaction successful!");
		  } catch (error) {
		    console.error("Error offering swap:", error);
		    alert("Error offering swap. Please check the partner address.");
		  }
	};
	
	handleSubmitacceptSwap = async (event) => {
    event.preventDefault();
    try {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: "Waiting on transaction success..." });
        const transactionReceipt = await TicketSale.methods.acceptSwap(this.state.partner).send({
            from: accounts[0]
        });
        if (transactionReceipt.status) {
            alert(`
                ____Are you willing to accept this swap?____\n
                Swap Accepted: ${this.state.partner}
            `);
        } else {
            throw new Error("Transaction failed");
        }
    } catch (error) {
        console.error("Error accepting swap:", error.message);
        alert("Error accepting swap. Please check the console for more details.");
    }
}

	
	/*handleSubmitofferSwap = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success..." });

    // Use send() instead of call() to execute the transaction
    await TicketSale.methods.offerSwap(this.state.partner).send({
        from: accounts[0], // or the appropriate account
    });

    // No need to await for the transaction receipt, as send() handles that internally

    alert(`
        ____Are you willing to Offer this ticket?____\n
        Ticket Offered: ${this.state.partner}
    `);
}*/


	

	render() {
	console.log(this.state.owner);
	return (
	/*<div>
      		 <h2>TicketSale Contract</h2>
       <p>
     	 This TicketSale project is owned by {this.state.owner},
         There are currently {this.state.totalTickets} available Tickets
       </p>
     
       <form onSubmit ={this.handleSubmitPurchaseTicket}>
         <h4>Buy Ticket</h4>
         <div>
           <label>Enter ticket ID </label>
           <input
              placeholder='Enter Id'
              onChange={this.handleChangeTicketId}
           />
         </div>
         <div>
         <button name="buyTicket">click to buy a ticket</button>
         </div>
       </form>
       
       
       <form onSubmit ={this.handleSubmitgetTicketOf}>
         <h4>Get Ticket</h4>
         <div>
           <label>Enter Address </label>
           <input
              placeholder='Enter owner address'
              onChange={this.handleChangegetTicketOf}
           />
         </div>
         <div>
         <button name="Get Ticket Owner">click to get owner of a ticket </button>
         </div>
       </form>
       
       
        <form onSubmit ={this.handleSubmitreturnTicket}>
         <h4>Return Ticket</h4>
         <div>
           <label>Enter Address </label>
           <input
              placeholder='Enter your address'
              onChange={this.handleChangereturnTicket}
           />
         </div>
         <div>
         <button name="return ticket">click to return your ticket</button>
         </div>
       </form>
       </div>*/
       //render() {
 // console.log(this.state.owner);
 // return (
    <div>
    
    <div className="app-container">
      <div className="ticket-container">
        <h2>TicketSale Contract</h2>
       <div style={{ backgroundColor: 'green', padding: '20px' }}>
	  <p style={{ color: '#fff' }}>
	    This TicketSale project is owned by {this.state.owner},
	    There are currently {this.state.totalTickets} available Tickets
	  </p>
	</div>
	
        <form onSubmit={this.handleSubmitPurchaseTicket}>
          <h4>Buy Ticket</h4>
          <div>
            <label>Enter ticket ID </label>
            <input
              placeholder='Enter Id'
              onChange={this.handleChangeTicketId}
            />
          </div>
          <div>
            <button type="submit" className="buy-button">Buy a Ticket</button>
          </div>
        </form>

        <form onSubmit={this.handleSubmitgetTicketOf}>
          <h4>Get Ticket</h4>
          <div>
            <label>Enter Address </label>
            <input
              placeholder='Enter owner address'
              onChange={this.handleChangegetTicketOf}
            />
          </div>
          <div>
            <button type="submit" className="get-button">Get Ticket Owner</button>
          </div>
        </form>

        <form onSubmit={this.handleSubmitreturnTicket}>
          <h4>Return Ticket</h4>
          <div>
            <label>Enter Address </label>
            <input
              placeholder='Enter your address'
              onChange={this.handleChangereturnTicket}
            />
          </div>
          <div>
            <button type="submit" className="return-button">Return Your Ticket</button>
          </div>
        </form>
        
        <form onSubmit={this.handleSubmitofferSwap}>
          <h4>Offer Ticket</h4>
          <div>
            <label>Enter Address </label>
            <input
              placeholder='Enter reciever  address'
              onChange={this.handleChangeofferSwap}
            />
          </div>
          <div>
            <button type="submit" className="offer-button">Offer Your Ticket</button>
          </div>
        </form>
        
         <form onSubmit={this.handleSubmitacceptSwap}>
          <h4>Accept Ticket</h4>
          <div>
            <label>Enter Address </label>
            <input
              placeholder='Enter offerer address'
              onChange={this.handleChangeacceptSwap}
            />
          </div>
          <div>
            <button type="submit" className="accept-button"> Accept Offered Ticket</button>
          </div>
        </form>
      </div>
    </div>
    </div>
	);
	}

}

export default App;

