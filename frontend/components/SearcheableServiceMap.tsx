'use client'

import { useEffect, useState } from 'react';

import ServicesSearchControls from "@/components/ServicesSearchControls";
import SponsorComponent from "@/components/SponsorComponent";
import NewServiceComponent from "@/components/NewServiceComponent";
import ServicesMapRenderer from "@/components/ServicesMapRenderer";

import { Radar } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

import { 
    servicesTypeIndex, 
    contractAddress, 
    contractBlock, 
    coordinatesPrecision, 
    abi } from '@/constants'
import { parseAbiItem } from 'viem'
import { getPublicClient } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { LatLng } from 'leaflet';

export default function SercheableServiceMap() {
    const [services, setServices] = useState<number[][]>([]);
    const [servicesKind, setServicesKind] = useState(null);
    const [newServiceLocation, setNewServiceLocation] = useState(null);
    const [isSponsored, setIsSponsored] = useState(false);

    // Viem public client déjà défini dans le layout 
    const client = getPublicClient();
    const { address, isConnected } = useAccount();

    const syncServices = async(serviceType) => {
        const abiEvent = "event ServiceRegistered( \
                                    uint serviceId, \
                                    string desc, \
                                    int64 lat, \
                                    int64 long, \
                                    int16 indexed citylat, \
                                    int16 indexed citylong, \
                                    uint8 indexed kind)";
                                    
        const logs = await client.getLogs({
            event: parseAbiItem(abiEvent),
            fromBlock: contractBlock,
            toBlock: BigInt(100000),
            args: { 
                kind: Number(servicesTypeIndex[serviceType])
              }
        })    
        console.log(logs.length);
 
        let data = []
        let servicesMarkers = []
        for (let i = 0; i < logs.length; i++) {
            const parsedLat = Number(logs[i].args.lat)/coordinatesPrecision;
            const parsedLong = Number(logs[i].args.long)/coordinatesPrecision;
            const latlong = new LatLng(parsedLat, parsedLong);
            data = [...data, { 
                                serviceId: logs[i].args.serviceId,
                                desc: logs[i].args.desc,
                                lat: parsedLat,
                                long: parsedLong,
                                citylat: logs[i].args.citylat,
                                citylong: logs[i].args.citylong,
                                kind: logs[i].args.kind,
                            }
            
            ];
            if(servicesTypeIndex[serviceType] == logs[i].args.kind){
                servicesMarkers.push({desc: logs[i].args.desc, latlng: latlong})
            }
            
        }
        if(logs.length > 0){
            setServices(servicesMarkers)
        }else{
            setServices([])
        }
        setServicesKind(serviceType);
    }

    const serviceSearch = async(serviceKind, serviceDesc) => {
        await syncServices(serviceKind);
    }

    const markerHandler = (location) => {
        setNewServiceLocation(location);
    }

    const _getUserSponsoredEvents = async() => {
        // get all the ProposalsRegistered events 
        const logs = await client.getLogs({
            event: parseAbiItem('event UserSponsored(address indexed addr)'),
            fromBlock: contractBlock,
            args: {
                addr : address
            }
        })
        console.log("User is sponsored ", logs.length === 1);
        if(logs.length === 1){
            setIsSponsored(true)
        }else{
            setIsSponsored(false)
        }
    }

    useEffect(() => {
        const getUserSponsoredEvents = async() => {
            if(isConnected) {
                await _getUserSponsoredEvents()
            }
        }
        getUserSponsoredEvents();
    }, [address])

    return  <>  
                <div className="flow-root">
                    <span className="flex items-center float-left">
                        <Radar className="mr-2"/> 
                        <span className="font-bold">FreeNearMe</span>
                    </span>
                    <span className="float-right mb-2"><ConnectButton /></span>
                </div>
                
                <Separator className="mb-2"/>
                <div className="grid xl:grid-cols-4 gap-4">
                    <Card className="xl:order-1 order-2 xl:col-span-3">
                        <CardContent>
                            <ServicesMapRenderer markers={services} markersKind={servicesKind} markerHandler={markerHandler}/>
                        </CardContent>
                    </Card>
                    <div className="grid xl:grid-cols-1 gap-4 xl:order-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Find services</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ServicesSearchControls serviceSearch={serviceSearch}/>
                            </CardContent>
                        </Card>
                        { isSponsored &&
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add a service</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <NewServiceComponent newServiceLocation={newServiceLocation}/>
                                </CardContent>
                            </Card>
                        }
                        { isSponsored &&                     
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sponsor a user</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SponsorComponent/>
                                </CardContent>
                            </Card>
                        }
                    </div>
                </div>
            </>
}