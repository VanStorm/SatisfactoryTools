import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import {Data} from '@src/Data/Data';

const mapping: {[key: string]: string} = {
	AILimiter: 'Desc_CircuitBoardHighSpeed_C',
	AluminiumIngot: 'Desc_AluminumIngot_C',
	AluminiumScrap: 'Desc_AluminumScrap_C',
	AluminiumSheet: 'Desc_AluminumPlate_C',
	AssemblerMk1: 'Build_AssemblerMk1_C',
	Battery: 'Desc_Battery_C',
	Bauxite: 'Desc_OreBauxite_C',
	Beacon: 'Desc_EquipmentDescriptorBeacon_C',
	Berry: 'Desc_Berry_C',
	Biomass_Final: 'Desc_GenericBiomass_C',
	BiomassGenerator: 'Build_GeneratorBiomass_C',
	Cables: 'Desc_Cable_C',
	CateriumIngot: 'Desc_GoldIngot_C',
	CateriumOre: 'Desc_OreGold_C',
	Chainsaw: 'Desc_Chainsaw_C',
	CircuitBoard: 'Desc_CircuitBoard_C',
	Cnr_Inv_Ramp_8x1_01: 'Build_RampInverted_8x1_Corner_01_C',
	Cnr_Inv_Ramp_8x2_01: 'Build_RampInverted_8x2_Corner_01_C',
	Cnr_Inv_Ramp_8x4_01: 'Build_RampInverted_8x4_Corner_01_C',
	Cnr_QuarterPipe_03: 'Build_QuarterPipeCorner_03_C',
	Cnr_QuarterPipe_04: 'Build_QuarterPipeCorner_04_C',
	CoalGenerator: 'Build_GeneratorCoal_C',
	CoalOre: 'Desc_Coal_C',
	CoffeeCup: 'Desc_EquipmentDescriptorCup_C',
	ColorCartridge: 'Desc_ColorCartridge_C',
	ColorGun: 'Desc_EquipmentDescriptorColorGun_C',
	CompactedCoal: 'Desc_CompactedCoal_C',
	Computer: 'Desc_Computer_C',
	Concrete: 'Desc_Cement_C',
	ConstructorMk1: 'Build_ConstructorMk1_C',
	ConveyorLiftMK1: 'Build_ConveyorLiftMk1_C',
	ConveyorLiftMK2: 'Build_ConveyorLiftMk2_C',
	ConveyorLiftMK3: 'Build_ConveyorLiftMk3_C',
	ConveyorLiftMK4: 'Build_ConveyorLiftMk4_C',
	ConveyorLiftMK5: 'Build_ConveyorLiftMk5_C',
	ConveyorMerger: 'Build_ConveyorAttachmentMerger_C',
	ConveyorMk1: 'Build_ConveyorBeltMk1_C',
	ConveyorMk2: 'Build_ConveyorBeltMk2_C',
	ConveyorMk3: 'Build_ConveyorBeltMk3_C',
	ConveyorMk4: 'Build_ConveyorBeltMk4_C',
	ConveyorMk5: 'Build_ConveyorBeltMk5_C',
	ConveyorPole: 'Build_ConveyorPole_C',
	ConveyorPole_Wall: 'Build_ConveyorPoleWall_C',
	ConveyorPoleMulti: 'Build_ConveyorPoleStackable_C',
	ConveyorSplitter: 'Build_ConveyorAttachmentSplitter_C',
	CopperIngot: 'Desc_CopperIngot_C',
	copper_new: 'Desc_OreCopper_C',
	CopperSheet: 'Desc_CopperSheet_C',
	CrystalOscillator: 'Desc_CrystalOscillator_C',
	Dbl_Ramp_8x8x1_01: 'Build_RampDouble_8x1_C',
	Dbl_Ramp_8x8x2_01: 'Build_RampDouble_C',
	Detonator: 'Desc_EquipmentDescriptorNobeliskDetonator_C',
	DockingStation: 'Build_TrainDockingStation_C',
	ElectromagneticControlRod: 'Desc_ElectromagneticControlRod_C',
	EmptyCannister: 'Desc_FluidCanister_C',
	EmptyPlatform: 'Build_TrainPlatformEmpty_C',
	EncasedSteelBeam: 'Desc_SteelPlateReinforced_C',
	Explorer: 'Desc_Explorer_C',
	Explosive: 'Desc_NobeliskExplosive_C',
	Fabric: 'Desc_Fabric_C',
	Fences: 'Build_Fence_01_C',
	Ficsit_Coupon: 'Desc_ResourceSinkCoupon_C',
	FlowerPetals_Final: 'Desc_FlowerPetals_C',
	FluidStorage: 'Build_PipeStorageTank_C',
	FluidStorageIndustrial: 'Build_IndustrialTank_C',
	Foundation_Glass: 'Build_FoundationGlass_01_C',
	Foundations_8x1: 'Build_Foundation_8x1_01_C',
	Foundations_8x2: 'Build_Foundation_8x2_01_C',
	Foundations_8x4: 'Build_Foundation_8x4_01_C',
	Foundry: 'Build_FoundryMk1_C',
	FrameworkFoundation: 'Build_Foundation_Frame_01_C',
	FreightCar: 'Desc_FreightWagon_C',
	Fuel: 'Desc_Fuel_C',
	FuelGenerator: 'Build_GeneratorFuel_C',
	GasMask: 'Desc_EquipmentDescriptorGasmask_C',
	GasMaskFilter: 'Desc_Filter_C',
	GeoThermalPowerGenerator: 'Build_GeneratorGeoThermal_C',
	GolfCart: 'Desc_GolfCart_C',
	Gunpowder: 'Desc_Gunpowder_C',
	HardDrive: 'Desc_HardDrive_C',
	HazmatFilter: 'Desc_HazmatFilter_C',
	HazmatSuit: 'Desc_EquipmentDescriptorHazmatSuit_C',
	Heatsink: 'Desc_AluminumPlateReinforced_C',
	HighSpeedConnector: 'Desc_HighSpeedConnector_C',
	HogPart: 'Desc_HogParts_C',
	Hub: 'Build_TradingPost_C',
	HubParts: 'Desc_HUBParts_C',
	HyperTube: 'Build_PipeHyper_C',
	HyperTube_WallHole: 'Build_HyperTubeWallHole_C',
	HyperTube_WallSupport: 'Build_HyperTubeWallSupport_C',
	HyperTubePole: 'Build_PipeHyperSupport_C',
	HyperTubeStart: 'Build_PipeHyperStart_C',
	Inhaler: 'Desc_Medkit_C',
	IronIngot: 'Desc_IronIngot_C',
	iron_new: 'Desc_OreIron_C',
	IronPlates: 'Desc_IronPlate_C',
	IronRods: 'Desc_IronRod_C',
	IronScrews: 'Desc_IronScrew_C',
	Jetpack: 'Desc_EquipmentDescriptorJetPack_C',
	JumpPad: 'Build_JumpPad_C',
	JumpPadTilted: 'Build_JumpPadTilted_C',
	LandingPad: 'Build_LandingPad_C',
	Leaves: 'Desc_Leaves_C',
	LiquidAlumina_Pipe: 'Desc_AluminaSolution_C',
	LiquidBiofuel: 'Desc_PackagedBiofuel_C',
	LiquidBiofuel_Pipe: 'Desc_LiquidTurboFuel_C',
	LiquidFuel_Pipe: 'Desc_LiquidFuel_C',
	LiquidHeavyOilResidue_Pipe: 'Desc_HeavyOilResidue_C',
	LiquidOil_Pipe: 'Desc_LiquidOil_C',
	LiquidSulfuricAcid_Pipe: 'Desc_SulfuricAcid_C',
	LiquidTurboFuel_Pipe: 'Desc_LiquidBiofuel_C',
	LiquidWater_Pipe: 'Desc_Water_C',
	Locomotive: 'Desc_Locomotive_C',
	LookOutTower: 'Build_LookoutTower_C',
	MAM: 'Build_Mam_C',
	Manufacturer: 'Build_ManufacturerMk1_C',
	MinerMk1: 'Build_MinerMk1_C',
	MinerMk2: 'Build_MinerMk2_C',
	MinerMk3: 'Build_MinerMk3_C',
	ModularFrame: 'Desc_ModularFrame_C',
	ModularFrameHeavy: 'Desc_ModularFrameHeavy_C',
	Motor: 'Desc_Motor_C',
	Mushroom: 'Desc_Shroom_C',
	Mycelia: 'Desc_Mycelia_C',
	NuclearCell: 'Desc_UraniumCell_C',
	NuclearFuelRod: 'Desc_NuclearFuelRod_C',
	NuclearPowerplant: 'Build_GeneratorNuclear_C',
	NuclearWaste: 'Desc_NuclearWaste_C',
	Nut: 'Desc_Nut_C',
	ObjectScanner: 'Desc_EquipmentDescriptorObjectScanner_C',
	Oil: 'Desc_PackagedOil_C',
	OilPump: 'Build_OilPump_C',
	OilRefinery: 'Build_OilRefinery_C',
	OilResidue: 'Desc_PackagedOilResidue_C',
	PackagedWater: 'Desc_PackagedWater_C',
	Parachute: 'Desc_Parachute_C',
	PetroleumCoke: 'Desc_PetroleumCoke_C',
	Pillar_Bottom: 'Build_PillarBase_C',
	Pillar_Middle: 'Build_PillarMiddle_C',
	Pillar_Top: 'Build_PillarTop_C',
	PipelineJunction: 'Build_PipelineJunction_Cross_C',
	PipePole: 'Build_PipelineSupport_C',
	PipePole_Stackable: 'Build_PipeSupportStackable_C',
	PipePump: 'Build_PipelinePump_C',
	Pipes: 'Build_Pipeline_C',
	PipeSupportWall: 'Build_PipelineSupportWall_C',
	PipeSupportWallHole: 'Build_PipelineSupportWallHole_C',
	Plastic: 'Desc_Plastic_C',
	PlayerStorage: 'Build_StoragePlayer_C',
	PolymerResin: 'Desc_PolymerResin_C',
	PortableMiner: 'Desc_ItemDescriptorPortableMiner_C',
	Powerline: 'Build_PowerLine_C',
	PowerPoleMk1: 'Build_PowerPoleMk1_C',
	PowerPoleMk2: 'Build_PowerPoleMk2_C',
	PowerPoleMk3: 'Build_PowerPoleMk3_C',
	PowerPoleWall_MK1: 'Build_PowerPoleWall_C',
	PowerPoleWall_MK2: 'Build_PowerPoleWall_Mk2_C',
	PowerPoleWall_MK3: 'Build_PowerPoleWall_Mk3_C',
	PowerPoleWallDouble_MK1: 'Build_PowerPoleWallDouble_C',
	PowerPoleWallDouble_MK2: 'Build_PowerPoleWallDouble_Mk2_C',
	PowerPoleWallDouble_MK3: 'Build_PowerPoleWallDouble_Mk3_C',
	PowerShard: 'Desc_CrystalShard_C',
	PowerSlugGreen: 'Desc_Crystal_C',
	PowerSlugPurple: 'Desc_Crystal_mk3_C',
	PowerSlugYellow: 'Desc_Crystal_mk2_C',
	ProgrammableSplitter: 'Build_ConveyorAttachmentSplitterProgrammable_C',
	QuarterPipe_01: 'Build_QuarterPipe_C',
	QuarterPipe_02: 'Build_QuarterPipe_02_C',
	QuarterPipe_Corner_01: 'Build_QuarterPipeCorner_01_C',
	QuarterPipe_Corner_02: 'Build_QuarterPipeCorner_02_C',
	QuartzCrystal: 'Desc_RawQuartz_C',
	QuartzResource: 'Desc_QuartzCrystal_C',
	Quickwire: 'Desc_HighSpeedWire_C',
	RadarTower: 'Build_RadarTower_C',
	RadioControlUnit: 'Desc_ModularFrameLightweight_C',
	Ramp8x1: 'Build_Ramp_8x1_01_C',
	Ramp_8x4_Inverted: 'Build_Ramp_8x4_Inverted_01_C',
	Ramp_8x8x4: 'Build_Ramp_8x8x8_C',
	RampInverted_8x8x1: 'Build_RampInverted_8x1_C',
	RampInverted_8x8x2: 'Build_RampInverted_8x2_01_C',
	Ramps: 'Build_Ramp_8x4_01_C',
	Ramps_small: 'Build_Ramp_8x2_01_C',
	RebarGun: 'Desc_RebarGunProjectile_C',
	ReinforcedIronPlates: 'Desc_IronPlateReinforced_C',
	ResourceSink: 'Build_ResourceSink_C',
	ResourceSinkShop: 'Build_ResourceSinkShop_C',
	Rifle_Magazine: 'Desc_CartridgeStandard_C',
	RifleMk1: 'Desc_EquipmentDescriptorRifle_C',
	Rotor: 'Desc_Rotor_C',
	Rubber: 'Desc_Rubber_C',
	SAMOre: 'Desc_SAM_C',
	ShockBaton: 'Desc_EquipmentDescriptorStunSpear_C',
	Silica: 'Desc_Silica_C',
	SmartSplitter: 'Build_ConveyorAttachmentSplitterSmart_C',
	SmelterMk1: 'Build_SmelterMk1_C',
	SolidBiofuel: 'Desc_Biofuel_C',
	SpaceElevator: 'Build_SpaceElevator_C',
	SpelevatorPart_1: 'Desc_SpaceElevatorPart_1_C',
	SpelevatorPart_2: 'Desc_SpaceElevatorPart_2_C',
	SpelevatorPart_3: 'Desc_SpaceElevatorPart_3_C',
	SpelevatorPart_4: 'Desc_SpaceElevatorPart_4_C',
	SpelevatorPart_5: 'Desc_SpaceElevatorPart_5_C',
	SpikedRebar: 'Desc_SpikedRebar_C',
	SpitterPart: 'Desc_SpitterParts_C',
	SprintingStilts: 'Desc_EquipmentDescriptorJumpingStilts_C',
	StairLeft: 'Build_Stairs_Left_01_C',
	StairRight: 'Build_Stairs_Right_01_C',
	Stator: 'Desc_Stator_C',
	SteelBeam: 'Desc_SteelPlate_C',
	SteelIngot: 'Desc_SteelIngot_C',
	SteelPipe: 'Desc_SteelPipe_C',
	Stone: 'Desc_Stone_C',
	StorageContainer: 'Build_StorageContainerMk1_C',
	StorageContainerMk2: 'Build_StorageContainerMk2_C',
	Sulfur: 'Desc_Sulfur_C',
	SuperComputer: 'Desc_ComputerSuper_C',
	Track: 'Build_RailroadTrack_C',
	Tractor: 'Desc_Tractor_C',
	TrainDockingFluid: 'Build_TrainDockingStationLiquid_C',
	TrainStation: 'Build_TrainStation_C',
	Truck: 'Desc_Truck_C',
	TruckStation: 'Build_TruckStation_C',
	TurboFuel: 'Desc_TurboFuel_C',
	TurboMotor: 'Desc_MotorLightweight_C',
	TXUI_Foundation_Corner_8x1: 'Build_Ramp_Diagonal_8x1_01_C',
	TXUI_Foundation_Corner_8x2: 'Build_Ramp_Diagonal_8x2_01_C',
	TXUI_Foundation_Corner_8x4: 'Build_Ramp_Diagonal_8x4_01_C',
	TXUI_Ramp_Corner_8x1: 'Build_Ramp_Diagonal_8x1_02_C',
	TXUI_Ramp_Corner_8x2: 'Build_Ramp_Diagonal_8x2_02_C',
	TXUI_Ramp_Corner_8x4: 'Build_Ramp_Diagonal_8x4_02_C',
	UraniumOre: 'Desc_OreUranium_C',
	UraniumPellets: 'Desc_UraniumPellet_C',
	WalkwayCross: 'Build_WalkwayCross_C',
	WalkwayRamp: 'Build_WalkwayRamp_C',
	WalkwayStraight: 'Build_WalkwayStraight_C',
	WalkwayTCross: 'Build_WalkwayT_C',
	WalkwayTurn: 'Build_WalkwayTurn_C',
	Wall_Conveyor_Perpendicular_Grey: 'Build_Wall_Conveyor_8x4_04_Steel_C',
	Wall_Conveyor_Perpendicular_Orange: 'Build_Wall_Conveyor_8x4_04_C',
	Wall_Conveyor_x1_Grey: 'Build_Wall_Conveyor_8x4_03_Steel_C',
	Wall_Conveyor_x1_Orange: 'Build_Wall_Conveyor_8x4_03_C',
	Wall_Conveyor_x2_Grey: 'Build_Wall_Conveyor_8x4_02_Steel_C',
	Wall_Conveyor_x2_Orange: 'Build_Wall_Conveyor_8x4_02_C',
	Wall_Conveyor_x3_Grey: 'Build_Wall_Conveyor_8x4_01_Steel_C',
	Wall_Conveyor_x3_Orange: 'Build_Wall_Conveyor_8x4_01_C',
	Wall_Door_Center_Grey: 'Build_Wall_Door_8x4_01_Steel_C',
	Wall_Door_Center_Orange: 'Build_Wall_Door_8x4_01_C',
	Wall_Door_Left_Grey: 'Build_Wall_Door_8x4_02_Steel_C',
	Wall_Door_Left_Orange: 'Build_Wall_Door_8x4_02_C',
	Wall_Door_Right_Grey: 'Build_Wall_Door_8x4_03_Steel_C',
	Wall_Door_Right_Orange: 'Build_Wall_Door_8x4_03_C',
	Wall_Grey: 'Build_Wall_8x4_02_C',
	Wall_Orange: 'Build_Wall_8x4_01_C',
	Wall_Orange_Gate: 'Build_Wall_Gate_8x4_01_C',
	Wall_Window_8x4_01: 'Build_Wall_Window_8x4_01_C',
	Wall_Window_8x4_02: 'Build_Wall_Window_8x4_02_C',
	Wall_Window_8x4_03: 'Build_Wall_Window_8x4_03_C',
	Wall_Window_8x4_04: 'Build_Wall_Window_8x4_04_C',
	Wat_1: 'Desc_WAT1_C',
	Wat_2: 'Desc_WAT2_C',
	Waterpump: 'Build_WaterPump_C',
	Wire: 'Desc_Wire_C',
	Wood: 'Desc_Wood_C',
	Workbench: 'Build_WorkBench_C',
	Workshop: 'Build_Workshop_C',
	XenoZapper: 'Desc_EquipmentDescriptorShockShank_C',
}

const baseOriginalPath = path.join(__dirname, '..', 'data', 'icons');
const baseTargetPath = path.join(__dirname, '..', 'www', 'assets', 'images', 'items');

const files: string[] = [];

function addFiles(dir: string) {
	const items = fs.readdirSync(dir, {withFileTypes: true});
	for (const item of items) {
		let joinedPath = path.join(dir, item.name);
		if (item.isDirectory()) {
			addFiles(joinedPath);
		} else if (item.isFile()) {
			files.push(joinedPath)
		}
	}
}

addFiles(baseOriginalPath);

const data = new Data();
for (const file of files) {
	let className = path.basename(file)
		.replace('_New.png', '.png')
		.replace('_256.png', '')
		.replace(/^Icon|Desc_|Build_/g, '');

	if (className in mapping) {
		className = mapping[className];
	}

	if (className.match(/Descriptor/)) {
		className = className.replace('Desc_', 'BP_');
	} else {
		className = className.replace('Build_', 'Desc_');
	}

	const item = data.getItemByClassName(className);
	let slug = '';
	if (!item) {
		const building = data.getBuildingByClassName(className);
		if (!building) {
			console.error('Missing item or building: ' + className);
		} else {
			slug = building.slug;
		}
	} else {
		slug = item.slug;
	}

	if (slug) {
		fs.copyFileSync(file, path.join(baseTargetPath, slug + '_256.png'));
		sharp(file).resize(64, 64).toFile(path.join(baseTargetPath, slug + '_64.png')).then();
	}
}