export interface MilitaryRank {
  id: string;
  rank: string;
  grade: string;
}

export const militaryRanks: Record<string, MilitaryRank[]> = {
  "Army": [
    { id: "army-e1", rank: "PVT", grade: "E-1" },
    { id: "army-e2", rank: "PFC", grade: "E-2" },
    { id: "army-e3", rank: "SPC/CPL", grade: "E-3" },
    { id: "army-e4", rank: "SGT", grade: "E-4" },
    { id: "army-e5", rank: "SSG", grade: "E-5" },
    { id: "army-e6", rank: "SFC", grade: "E-6" },
    { id: "army-e7", rank: "MSG/1SG", grade: "E-7" },
    { id: "army-e8", rank: "SGM/CSM", grade: "E-8" },
    { id: "army-w1", rank: "WO1", grade: "W-1" },
    { id: "army-w2", rank: "CW2", grade: "W-2" },
    { id: "army-w3", rank: "CW3", grade: "W-3" },
    { id: "army-w4", rank: "CW4", grade: "W-4" },
    { id: "army-w5", rank: "CW5", grade: "W-5" },
    { id: "army-o1", rank: "2LT", grade: "O-1" },
    { id: "army-o2", rank: "1LT", grade: "O-2" },
    { id: "army-o3", rank: "CPT", grade: "O-3" },
    { id: "army-o4", rank: "MAJ", grade: "O-4" },
    { id: "army-o5", rank: "LTC", grade: "O-5" },
    { id: "army-o6", rank: "COL", grade: "O-6" }
  ],
  "Navy": [
    { id: "navy-e1", rank: "SR", grade: "E-1" },
    { id: "navy-e2", rank: "SA", grade: "E-2" },
    { id: "navy-e3", rank: "SN", grade: "E-3" },
    { id: "navy-e4", rank: "PO3", grade: "E-4" },
    { id: "navy-e5", rank: "PO2", grade: "E-5" },
    { id: "navy-e6", rank: "PO1", grade: "E-6" },
    { id: "navy-e7", rank: "CPO", grade: "E-7" },
    { id: "navy-e8", rank: "SCPO", grade: "E-8" },
    { id: "navy-e9", rank: "MCPO", grade: "E-9" },
    { id: "navy-o1", rank: "ENS", grade: "O-1" },
    { id: "navy-o2", rank: "LTJG", grade: "O-2" },
    { id: "navy-o3", rank: "LT", grade: "O-3" },
    { id: "navy-o4", rank: "LCDR", grade: "O-4" },
    { id: "navy-o5", rank: "CDR", grade: "O-5" },
    { id: "navy-o6", rank: "CAPT", grade: "O-6" }
  ],
  "Air Force": [
    { id: "af-e1", rank: "AB", grade: "E-1" },
    { id: "af-e2", rank: "Amn", grade: "E-2" },
    { id: "af-e3", rank: "A1C", grade: "E-3" },
    { id: "af-e4", rank: "SrA", grade: "E-4" },
    { id: "af-e5", rank: "SSgt", grade: "E-5" },
    { id: "af-e6", rank: "TSgt", grade: "E-6" },
    { id: "af-e7", rank: "MSgt", grade: "E-7" },
    { id: "af-e8", rank: "SMSgt", grade: "E-8" },
    { id: "af-e9", rank: "CMSgt", grade: "E-9" },
    { id: "af-o1", rank: "2d Lt", grade: "O-1" },
    { id: "af-o2", rank: "1st Lt", grade: "O-2" },
    { id: "af-o3", rank: "Capt", grade: "O-3" },
    { id: "af-o4", rank: "Maj", grade: "O-4" },
    { id: "af-o5", rank: "Lt Col", grade: "O-5" },
    { id: "af-o6", rank: "Col", grade: "O-6" }
  ],
  "Marine Corps": [
    { id: "usmc-e1", rank: "Pvt", grade: "E-1" },
    { id: "usmc-e2", rank: "PFC", grade: "E-2" },
    { id: "usmc-e3", rank: "LCpl", grade: "E-3" },
    { id: "usmc-e4", rank: "Cpl", grade: "E-4" },
    { id: "usmc-e5", rank: "Sgt", grade: "E-5" },
    { id: "usmc-e6", rank: "SSgt", grade: "E-6" },
    { id: "usmc-e7", rank: "GySgt", grade: "E-7" },
    { id: "usmc-e8", rank: "MSgt/1stSgt", grade: "E-8" },
    { id: "usmc-e9", rank: "MGySgt/SgtMaj", grade: "E-9" },
    { id: "usmc-o1", rank: "2ndLt", grade: "O-1" },
    { id: "usmc-o2", rank: "1stLt", grade: "O-2" },
    { id: "usmc-o3", rank: "Capt", grade: "O-3" },
    { id: "usmc-o4", rank: "Maj", grade: "O-4" },
    { id: "usmc-o5", rank: "LtCol", grade: "O-5" },
    { id: "usmc-o6", rank: "Col", grade: "O-6" }
  ],
  "Space Force": [
    { id: "sf-e1", rank: "Spc1", grade: "E-1" },
    { id: "sf-e2", rank: "Spc2", grade: "E-2" },
    { id: "sf-e3", rank: "Spc3", grade: "E-3" },
    { id: "sf-e4", rank: "Spc4", grade: "E-4" },
    { id: "sf-e5", rank: "Sgt", grade: "E-5" },
    { id: "sf-e6", rank: "TSgt", grade: "E-6" },
    { id: "sf-e7", rank: "MSgt", grade: "E-7" },
    { id: "sf-e8", rank: "SMSgt", grade: "E-8" },
    { id: "sf-e9", rank: "CMSgt", grade: "E-9" },
    { id: "sf-o1", rank: "2d Lt", grade: "O-1" },
    { id: "sf-o2", rank: "1st Lt", grade: "O-2" },
    { id: "sf-o3", rank: "Capt", grade: "O-3" },
    { id: "sf-o4", rank: "Maj", grade: "O-4" },
    { id: "sf-o5", rank: "Lt Col", grade: "O-5" },
    { id: "sf-o6", rank: "Col", grade: "O-6" }
  ]
};