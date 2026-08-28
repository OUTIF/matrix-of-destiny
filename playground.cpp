#include <iostream> 
using namespace std; 

int round(int x){
    
    if(x<=22){return x;}
    int result=0 ;
    while(x>0){
        result+=x%10;
        x/=10;
    }
    if(result>22){return round(result);}
    return result;
}

struct node{
    int value;
};

class matrix {
public:
    enum NodeID {
        // --- 1. Main Diagonal Square (Base Energies) --- 
        DayLeft = 0,
        MonthTop = 1,
        YearRight = 2,
        Bottom = 3,
        Center = 8,
        InnerCenterRight = 9,    // Between 8 and 12

        // --- 2. Direct Square (Ancestral Lines) ---
        SquareTopLeft = 4,
        SquareTopRight = 5,
        SquareBottomRight = 6,
        SquareBottomLeft = 7,

        // --- 3. Main Axis Intersections (Inner Square) ---
        InnerLeft = 10,
        InnerTop = 11,
        InnerRight = 12,
        InnerBottom = 13,

        // --- 4. Diagonal Intersections (Inner Diamond) ---
        IntersectTopLeft = 21,
        IntersectTopRight = 22,
        IntersectBottomRight = 23,
        IntersectBottomLeft = 24,

        // --- 5. Outer Tips (On the Main Horizontal/Vertical Axes) ---
        OuterLeft = 14,
        OuterTop = 15,
        OuterRight = 16,
        OuterBottom = 17,

        // --- 6. Outer Diagonal Tips (On the Ancestral Lines) ---
        OuterDiagTopLeft = 25,
        OuterDiagTopRight = 26,
        OuterDiagBottomRight = 27,
        OuterDiagBottomLeft = 28,

        // --- 7. Specialty / Channel Points (Wealth, Relationships, etc.) ---
      
        WealthUpper = 18,        // On the 8-6 diagonal
        RelationshipLower = 19,  // On the 13-12 connecting line
        RelationshipUpper = 20,  // On the 13-12 connecting line
        InnerCenterLeft = 29,    // Between 8 and 10
        InnerCenterTop = 30      // Between 8 and 11
    };




    private:

    node array[31];

    public:
        matrix(int day,int month,int year){
        array[DayLeft].value=round(day);
        array[MonthTop].value=month;
        array[YearRight].value=round(year);
        array[Bottom].value = round(array[DayLeft].value + array[MonthTop].value + array[YearRight].value);
        array[Center].value=round(array[DayLeft].value + array[MonthTop].value + array[YearRight].value+array[Bottom].value);
       
        Direct_Square();
        Main_Axis_Intersections();
        Outer_Tips();
        Specialty_Channel_Points();
         array[InnerCenterRight].value=round(array[SquareTopLeft].value+array[SquareTopRight].value+array[SquareBottomRight].value+array[SquareBottomLeft].value);
        Diagonal_Intersections();
        Outer_Diagonal_Tips();
    }

    private:void Direct_Square(){
        array[SquareTopLeft].value=round(array[DayLeft].value+array[MonthTop].value);
        array[SquareTopRight].value=round(array[MonthTop].value+array[YearRight].value);
        array[SquareBottomRight].value=round(array[YearRight].value+array[Bottom].value);
        array[SquareBottomLeft].value=round(array[Bottom].value+array[DayLeft].value);
    }
    private:void Main_Axis_Intersections(){
        array[InnerLeft].value=round(array[Center].value+array[DayLeft].value);
        array[InnerTop].value=round(array[Center].value+array[MonthTop].value);
        array[InnerRight].value=round(array[Center].value+array[YearRight].value);
        array[InnerBottom].value=round(array[Center].value+array[Bottom].value);
    }
    private:void Outer_Tips(){
        array[OuterLeft].value=round(array[DayLeft].value+array[InnerLeft].value);
        array[OuterTop].value=round(array[MonthTop].value+array[InnerTop].value);
        array[OuterRight].value=round(array[YearRight].value+array[InnerRight].value);
        array[OuterBottom].value=round(array[Bottom].value+array[InnerBottom].value);
    }
    private:void Specialty_Channel_Points(){
        array[WealthUpper].value=round(array[InnerBottom].value+array[InnerRight].value);
        array[RelationshipLower].value=round(array[InnerBottom].value+array[WealthUpper].value);
        array[RelationshipUpper].value=round(array[InnerRight].value+array[WealthUpper].value);
        array[InnerCenterLeft].value=round(array[Center].value+array[InnerLeft].value);
        array[InnerCenterTop].value=round(array[Center].value+array[InnerTop].value);
    }
    private:void Diagonal_Intersections(){
        array[IntersectTopLeft].value=round(array[InnerCenterRight].value+array[SquareTopLeft].value);
        array[IntersectTopRight].value=round(array[InnerCenterRight].value+array[SquareTopRight].value);
        array[IntersectBottomRight].value=round(array[InnerCenterRight].value+array[SquareBottomRight].value);
        array[IntersectBottomLeft].value=round(array[InnerCenterRight].value+array[SquareBottomLeft].value);
    }

    private:void Outer_Diagonal_Tips(){
    array[OuterDiagTopLeft].value=round(array[SquareTopLeft].value+array[IntersectTopLeft].value);
    array[OuterDiagTopRight].value=round(array[SquareTopRight].value+array[IntersectTopRight].value)      ;  
    array[OuterDiagBottomRight].value=round(array[SquareBottomRight].value+array[IntersectBottomRight].value);
    array[OuterDiagBottomLeft].value=round(array[SquareBottomLeft].value+array[IntersectBottomLeft].value);

    }
    
    public: void display_(){
        for (int i = 0; i <=30; i++)
        {
           cout<<array[i].value<<" ";
        }
    }



};



int main(){

    int day;
    int month;
    int year;

    cout<<"day:";
    cin>>day;
    cout<<"month:";
    cin>>month;
    cout<<"year:";
    cin>>year;

    matrix matrix(day,month,year);
    matrix.display_();

 

    return 0;
}