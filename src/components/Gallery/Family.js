import React, { Component } from "react";

class Family extends Component {
  render() {
    return (
      <div className="column" style={{ padding: "15px 5px 5px 5px" }}>
        <div
          style={{ fontSize: "50px" }}
          className="ui grey center aligned huge header"
        >
          Original Graphics
        </div>

        <div className="ui vertical center aligned segment">
          <h1 style={{ fontSize: "40px" }} className="ui header">
            Family
          </h1>
        </div>

        <div>
          <div class="ui medium images">
         
            <img
              className="ui image"
              alt="family"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY859d2HZzcc_fO-hZ0Mf-FS_X1Rd0pls6kMOh2UqX20sJKVOzEA"
            />
          </div>
        </div>

        <div className="ui medium images">
          <img
            className="ui image"
            alt="family"
            src="https://www.condoncharles.com.au/wp-content/uploads/2016/06/family-pictures-19-300x200.jpg"
          />
        </div>

        <div className="ui medium images">
          <img
            className="ui image"
            alt="family"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmLBG2qYPoS31N_Ht10D2uIw2ucbQATvHMbfe6x3eyDciJg99ZA"
          />
        </div>
      </div>
      
    );
  }
}
export default Family;
