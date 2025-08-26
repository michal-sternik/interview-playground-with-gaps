import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

// TASK 3: Implement custom hook useDebounce
//
// GOAL: Create a hook that delays the execution of a function by a specified time
//
// REQUIREMENTS:
// 1. The hook should accept a value (string) and delay (number in milliseconds)
// 2. Should return the "debounced" value
// 3. The value should only be updated after the specified time has passed since the last change
// 4. If the value changes before the time elapses, the timer should be reset
// 5. Use setTimeout and clearTimeout to implement the delay
// 6. Clean up the timeout in the useEffect cleanup function
// 7.   Delete "|| searchTerm" after useDebounce hook is finished" in the code below:
//      const debouncedSearchTerm = useDebounce(searchTerm, 500) || searchTerm;
//
// HOW IT WORKS:
// - When the input value changes, start a timer
// - If the value changes again before the timer expires, cancel the old timer and start a new one
// - Only when the timer expires without interruption, update the debounced value
//
// EXAMPLE:
// const debouncedSearchTerm = useDebounce(searchTerm, 500)
// // If user types "hello" quickly, debouncedSearchTerm will only update to "hello"
// // 500ms after they stop typing

// TODO: Implement the useDebounce hook below

export function useDebounce(value: string, delay: number) {
	//delete
	return null;
}

// Simulated city data (in a real app, this would be fetched from an API)

export default function Task3() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchCount, setSearchCount] = useState(0);

	// Using the useDebounce hook to delay search
	// Delete "|| searchTerm after useDebounce hook is finished"
	const debouncedSearchTerm = useDebounce(searchTerm, 500) || searchTerm;

	// Simulate city search
	const filteredCities = debouncedSearchTerm
		? cities.filter((city) =>
				city.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
			)
		: [];

	// Search call counter (to demonstrate debounce effectiveness)
	useEffect(() => {
		if (debouncedSearchTerm) {
			setSearchCount((prev) => prev + 1);
		}
	}, [debouncedSearchTerm]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link to="/">
						<Button variant="outline" className="mb-4 bg-transparent">
							<ArrowLeft className="size-4 mr-2" />
							Back to Task List
						</Button>
					</Link>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Search Cities</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<Input
								type="text"
								placeholder="Type city name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="max-w-md"
							/>

							<div className="flex gap-4 text-sm text-gray-600">
								<span>Typed text: "{searchTerm}"</span>
								<span>Searched text: "{debouncedSearchTerm}"</span>
								<span className="font-semibold">
									Search calls: {searchCount}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MapPin className="h-5 w-5" />
							Search Results ({filteredCities.length})
						</CardTitle>
					</CardHeader>
					<CardContent>
						{filteredCities.length > 0 ? (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
								{filteredCities.map((city, index) => (
									<Card
										key={index}
										className="bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
									>
										<CardContent className="pt-4">
											<div className="flex items-center gap-2">
												<MapPin className="size-4 text-blue-500" />
												<span className="font-medium">{city}</span>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<p className="text-gray-500 text-center py-8">
								No cities found matching "{debouncedSearchTerm}"
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
const cities = [
	"Tokyo",
	"Delhi",
	"Shanghai",
	"São Paulo",
	"Mexico City",
	"Cairo",
	"Mumbai",
	"Beijing",
	"Dhaka",
	"Osaka",
	"New York City",
	"Karachi",
	"Buenos Aires",
	"Chongqing",
	"Istanbul",
	"Kolkata",
	"Manila",
	"Lagos",
	"Rio de Janeiro",
	"Tianjin",
	"Kinshasa",
	"Guangzhou",
	"Los Angeles",
	"Moscow",
	"Shenzhen",
	"Lahore",
	"Bangalore",
	"Paris",
	"Bogotá",
	"Jakarta",
	// Added cities
	"London",
	"Lima",
	"Bangkok",
	"Tehran",
	"Ho Chi Minh City",
	"Hong Kong",
	"Hyderabad",
	"Chicago",
	"Nagoya",
	"Taipei",
	"Santiago",
	"Riyadh",
	"Madrid",
	"Dallas",
	"Toronto",
	"Miami",
	"Philadelphia",
	"Houston",
	"Singapore",
	"Washington D.C.",
	"Barcelona",
	"San Francisco",
	"Boston",
	"Sydney",
	"Melbourne",
	"Montreal",
	"Berlin",
	"Rome",
	"Athens",
	"Brussels",
	"Vienna",
	"Warsaw",
	"Budapest",
	"Prague",
	"Munich",
	"Stockholm",
	"Copenhagen",
	"Dublin",
	"Lisbon",
	"Zurich",
	"Geneva",
	"Oslo",
	"Helsinki",
	"Edinburgh",
	"Glasgow",
	"Birmingham",
	"Manchester",
	"Liverpool",
	"Leeds",
	"Sheffield",
	"Newcastle",
	"Nottingham",
	"Bristol",
	"Leicester",
	"Southampton",
	"Portland",
	"Seattle",
	"Denver",
	"Phoenix",
	"San Diego",
	"Las Vegas",
	"Orlando",
	"Atlanta",
	"Detroit",
	"Minneapolis",
	"St. Louis",
	"Tampa",
	"Charlotte",
	"Pittsburgh",
	"Cleveland",
	"Cincinnati",
	"Kansas City",
	"Indianapolis",
	"Columbus",
	"Milwaukee",
	"Sacramento",
	"Salt Lake City",
	"San Jose",
	"Austin",
	"Fort Worth",
	"El Paso",
	"Memphis",
	"Nashville",
	"Louisville",
	"Baltimore",
	"Oklahoma City",
	"Albuquerque",
	"Tucson",
	"Fresno",
	"Mesa",
	"Sacramento",
	"Long Beach",
	"Oakland",
	"Bakersfield",
	"Anaheim",
	"Honolulu",
	"Anchorage",
	"Raleigh",
	"Richmond",
	"Virginia Beach",
	"Jacksonville",
	"Miami Beach",
	"Orlando",
	"Tallahassee",
	"Fort Lauderdale",
	"West Palm Beach",
	"Boca Raton",
	"Naples",
	"Sarasota",
	"Clearwater",
	"St. Petersburg",
	"Tampa Bay",
	"Pensacola",
	"Mobile",
	"Montgomery",
	"Birmingham",
	"Huntsville",
	"Tuscaloosa",
	"Little Rock",
	"Fayetteville",
	"Springdale",
	"Jonesboro",
	"Texarkana",
	"Hot Springs",
	"Conway",
	"Pine Bluff",
	"Fort Smith",
	"Rogers",
	"Bentonville",
	"Cabot",
	"Searcy",
	"Russellville",
	"Van Buren",
	"Sherwood",
	"Bryant",
	"Bella Vista",
	"El Dorado",
	"Hope",
	"Magnolia",
	"Camden",
	"Arkadelphia",
	"Malvern",
	"Batesville",
	"Paragould",
	"Forrest City",
	"West Memphis",
	"Helena-West Helena",
	"Mountain Home",
	"Harrison",
	"Greenwood",
	"Clarksville",
	"Morrilton",
	"Dumas",
	"Stuttgart",
	"Osceola",
	"Trumann",
	"Wynne",
	"Pocahontas",
	"Corning",
	"Newport",
	"Marked Tree",
	"Lake Village",
	"Eudora",
	"De Queen",
	"Ashdown",
	"Mena",
	"Waldron",
	"Booneville",
	"Charleston",
	"Danville",
	"Dardanelle",
	"Ozark",
	"Paris",
	"Green Forest",
	"Berryville",
	"Eureka Springs",
	"Gentry",
	"Gravette",
	"Pea Ridge",
	"Prairie Grove",
	"Farmington",
	"Lincoln",
	"Elkins",
	"Alma",
	"Barling",
	"Cave Springs",
	"Centerton",
	"Decatur",
	"Garfield",
	"Gateway",
	"Highfill",
	"Hindsville",
	"Lowell",
	"Springdale",
	"Tontitown",
	"West Fork",
	"Winslow",
	"Avoca",
	"Bethel Heights",
	"Elm Springs",
	"Johnson",
	"Little Flock",
	"Sulphur Springs",
	"Bella Vista",
	"Bentonville",
	"Rogers",
	"Siloam Springs",
	"Springdale",
	"Fayetteville",
	"Greenland",
	"Elkins",
	"Farmington",
	"Prairie Grove",
	"Lincoln",
	"West Fork",
	"Winslow",
	"Alma",
	"Barling",
	"Cave Springs",
	"Centerton",
	"Decatur",
	"Garfield",
	"Gateway",
	"Highfill",
	"Hindsville",
	"Lowell",
	"Pea Ridge",
	"Tontitown",
	"Avoca",
	"Bethel Heights",
	"Elm Springs",
	"Johnson",
	"Little Flock",
	"Sulphur Springs",
];
