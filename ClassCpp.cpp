#include <stdlib.h>
#include <string.h>
#include <iostream>
#include <stdio.h>
class Fish
{
private:
    char name[15];
    int average_age;

public:
    Fish(char name[15], int average_age)
    {
        strcpy(this->name, name);
        this->average_age = average_age;
    }

    Fish()
    {
        strcpy(this->name, "Salmon");
        this->average_age = 100;
    }
    char *getName()
    {
        return this->name;
    }
    int getAverageAge()
    {
        return this->average_age;
    }
};

int main(int argc, char *argv[])
{
    printf("This Have Different Types Of Fish Species. %d\n", argc);

    for (size_t i = 0; i < argc; i++)
    {
        std::cout << i << "th argument is " << argv[i] << " ...\n";
    }

    char name[15];
    Fish salmon;

    printf("The Fish Called %s lives for %d years.\n", salmon.getName(), salmon.getAverageAge());
    Fish shark((char *)"Shark", 120);
    printf("The Fish Called %s lives for %d years.\n", shark.getName(), shark.getAverageAge());
    Fish *sea_horse = new Fish((char *)"Sea Horse", 87);
    printf("The Fish Called %s lives for %d years.\n", sea_horse->getName(), sea_horse->getAverageAge());
    system("PAUSE");
    return 0;
}