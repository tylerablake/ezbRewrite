import { ReusableChassisDetail } from "./reusable-chassis-detail.model";
import { ReuseHeader } from "./reuse-header.model";

export class SubmitReuse{
  ReuseChassisDetails: ReusableChassisDetail[];  
  ReuseHeader: ReuseHeader;
  constructor(){
    this.ReuseHeader = new ReuseHeader();
    this.ReuseChassisDetails = new Array<ReusableChassisDetail>();
  }
}