

function reduceValue(value){
    value=parseInt(value)

    if(value<23){return value}
    else{
        var result=0
        while(value>0){
            result+=value%10
            value = Math.floor(value / 10);
        }
        if(result>22){return reduceValue(result)}
        return result
    }
}


const NodeID = {
        // --- 1. Main Diagonal Square (Base Energies) --- 
        DayLeft : 0,
        MonthTop : 1,
        YearRight : 2,
        Bottom : 3,
        Center : 8,
        InnerCenterRight : 9,    // Between 8 and 12

        // --- 2. Direct Square (Ancestral Lines) ---
        SquareTopLeft : 4,
        SquareTopRight : 5,
        SquareBottomRight : 6,
        SquareBottomLeft : 7,

        // --- 3. Main Axis Intersections (Inner Square) ---
        InnerLeft : 10,
        InnerTop : 11,
        InnerRight : 12,
        InnerBottom : 13,

        // --- 4. Diagonal Intersections (Inner Diamond) ---
        IntersectTopLeft : 21,
        IntersectTopRight : 22,
        IntersectBottomRight : 23,
        IntersectBottomLeft : 24,

        // --- 5. Outer Tips (On the Main Horizontal/Vertical Axes) ---
        OuterLeft : 14,
        OuterTop : 15,
        OuterRight : 16,
        OuterBottom : 17,

        // --- 6. Outer Diagonal Tips (On the Ancestral Lines) ---
        OuterDiagTopLeft : 25,
        OuterDiagTopRight : 26,
        OuterDiagBottomRight : 27,
        OuterDiagBottomLeft : 28,

        // --- 7. Specialty / Channel Points (Wealth, Relationships, etc.) ---
      
        WealthUpper : 18,        // On the 8-6 diagonal
        RelationshipLower : 19,  // On the 13-12 connecting line
        RelationshipUpper : 20,  // On the 13-12 connecting line
        InnerCenterLeft : 29,    // Between 8 and 10
        InnerCenterTop : 30      // Between 8 and 11
    };

class Matrix{

    
    constructor(day,month,year){
        this.array= new Array(31).fill(0)

        this.array[NodeID.DayLeft]=reduceValue(day)
        this.array[NodeID.MonthTop]=reduceValue(month)
        this.array[NodeID.YearRight]=reduceValue(year)
        this.array[NodeID.Bottom]=reduceValue(this.array[NodeID.DayLeft]+this.array[NodeID.MonthTop]+this.array[NodeID.YearRight])
        this.array[NodeID.Center]=reduceValue(this.array[NodeID.DayLeft]+this.array[NodeID.MonthTop]+this.array[NodeID.YearRight]+this.array[NodeID.Bottom])

        this.Direct_Square()
        this.Main_Axis_Intersections()
        this.Outer_Tips()
        this.Specialty_Channel_Points()
        this.array[NodeID.InnerCenterRight]=reduceValue(this.array[NodeID.SquareTopLeft]+this.array[NodeID.SquareTopRight]+this.array[NodeID.SquareBottomRight]+this.array[NodeID.SquareBottomLeft]); // No:9
        this.Diagonal_Intersections()
        this.Outer_Diagonal_Tips()

        
    }

    Direct_Square(){
        this.array[NodeID.SquareTopLeft]=reduceValue(this.array[NodeID.DayLeft]+this.array[NodeID.MonthTop])
        this.array[NodeID.SquareTopRight]=reduceValue(this.array[NodeID.MonthTop]+this.array[NodeID.YearRight])
        this.array[NodeID.SquareBottomRight]=reduceValue(this.array[NodeID.YearRight]+this.array[NodeID.Bottom])
        this.array[NodeID.SquareBottomLeft]=reduceValue(this.array[NodeID.Bottom]+this.array[NodeID.DayLeft])
     }

    Main_Axis_Intersections(){
        this.array[NodeID.InnerLeft]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.DayLeft]);
        this.array[NodeID.InnerTop]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.MonthTop]);
        this.array[NodeID.InnerRight]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.YearRight]);
        this.array[NodeID.InnerBottom]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.Bottom]);
    }

    Outer_Tips(){
        this.array[NodeID.OuterLeft]=reduceValue(this.array[NodeID.DayLeft]+this.array[NodeID.InnerLeft]);
        this.array[NodeID.OuterTop]=reduceValue(this.array[NodeID.MonthTop]+this.array[NodeID.InnerTop]);
        this.array[NodeID.OuterRight]=reduceValue(this.array[NodeID.YearRight]+this.array[NodeID.InnerRight]);
        this.array[NodeID.OuterBottom]=reduceValue(this.array[NodeID.Bottom]+this.array[NodeID.InnerBottom]);
    }

    Specialty_Channel_Points(){
        this.array[NodeID.WealthUpper]=reduceValue(this.array[NodeID.InnerBottom]+this.array[NodeID.InnerRight]);
        this.array[NodeID.RelationshipLower]=reduceValue(this.array[NodeID.InnerBottom]+this.array[NodeID.WealthUpper]);
        this.array[NodeID.RelationshipUpper]=reduceValue(this.array[NodeID.InnerRight]+this.array[NodeID.WealthUpper]);
        this.array[NodeID.InnerCenterLeft]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.InnerLeft]);
        this.array[NodeID.InnerCenterTop]=reduceValue(this.array[NodeID.Center]+this.array[NodeID.InnerTop]);
    }

    Diagonal_Intersections(){
        this.array[NodeID.IntersectTopLeft]=reduceValue(this.array[NodeID.InnerCenterRight]+this.array[NodeID.SquareTopLeft]);
        this.array[NodeID.IntersectTopRight]=reduceValue(this.array[NodeID.InnerCenterRight]+this.array[NodeID.SquareTopRight]);
        this.array[NodeID.IntersectBottomRight]=reduceValue(this.array[NodeID.InnerCenterRight]+this.array[NodeID.SquareBottomRight]);
        this.array[NodeID.IntersectBottomLeft]=reduceValue(this.array[NodeID.InnerCenterRight]+this.array[NodeID.SquareBottomLeft]);
    }

    Outer_Diagonal_Tips(){
    this.array[NodeID.OuterDiagTopLeft]=reduceValue(this.array[NodeID.SquareTopLeft]+this.array[NodeID.IntersectTopLeft])
    this.array[NodeID.OuterDiagTopRight]=reduceValue(this.array[NodeID.SquareTopRight]+this.array[NodeID.IntersectTopRight])        
    this.array[NodeID.OuterDiagBottomRight]=reduceValue(this.array[NodeID.SquareBottomRight]+this.array[NodeID.IntersectBottomRight])
    this.array[NodeID.OuterDiagBottomLeft]=reduceValue(this.array[NodeID.SquareBottomLeft]+this.array[NodeID.IntersectBottomLeft])

    }

    display(){
        console.log(this.array.slice(0,31))
    }

}






document.getElementById("calcButton").addEventListener("click",()=> {

const inputDay  =document.getElementById("inputDay").value 
const inputMonth=document.getElementById("inputMonth").value
const inputYear =document.getElementById("inputYear").value

console.log("Day:", inputDay, "Month:", inputMonth, "Year:", inputYear);
if(!inputDay || !inputMonth || !inputYear){
    alert("please enter a valid date of birth.")
    console.error("invalid input")
    return;
}

const myMatrix = new Matrix(inputDay,inputMonth,inputYear)

for (let i = 0; i < 31; i++) {
        let textElement = document.getElementById("node-" + i);
        if (textElement) {
            textElement.textContent = myMatrix.array[i];
        }
    }


});
