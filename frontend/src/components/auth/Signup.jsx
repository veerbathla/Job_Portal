import React from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2 space-y-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Veer Singh" />
          </div>

          <div className="my-2 space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="veerbathla0676@gmail.com" />
          </div>

          <div className="my-2 space-y-2">
            <Label>Phone No.</Label>
            <Input type="text" placeholder="1234567891" />
          </div>

          <div className="my-2 space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Veer Singh" />
          </div>

          <div className="flex items-center justify-between space-y-2">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Candidate</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem  id="option-two" />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
