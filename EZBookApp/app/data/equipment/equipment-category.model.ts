export class EquipmentCategory{
  EquipmentCategoryCode: string;
  EquipmentCategoryDescription: string;

  constructor(code:string, description:string){
    this.EquipmentCategoryCode = code;
    this.EquipmentCategoryDescription = description;
  }
}