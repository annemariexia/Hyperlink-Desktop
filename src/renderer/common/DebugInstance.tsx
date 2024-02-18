class DebugInstance {
    private static instance: DebugInstance
    public account_no: string;
    public address: string;
    public availability: string;
    public balance: string;
    public cpu: string;
    public cpuEarningsYrly: number;
    public cpu_core: string;
    public device_id: string;
    public email: string;
    public estimated_earningyrly: number;
    public expected_earnings: string;
    public gpu: string;
    public gpuEarningsYrly: number;
    public gpu_vram: string;
    public IP: string;
    public isPaid: string;
    public lifetimePotential: number;
    public mac_address: string;
    public monthlyPotential: number;
    public name: string;
    public paidOn: Date;
    public payout_method: string;
    public payout_requested: string;
    public payout_request_time: string;
    public pcs: number;
    public potential_earningyrly: number;
    public ram_Gb: string;
    public rvnHashrate: number;
    public signedup: Date;
    public user_id: string;
    public xmrHashrate: number;
    
  
    private constructor() {
      // Initialize values
      this.account_no = "<NULL>";
      this.address = "<NULL>";
      this.availability = "<NULL>";
      this.balance = "<NULL>";
      this.cpu = "<NULL>";
      this.cpuEarningsYrly = 0;
      this.cpu_core = "<NULL>";
      this.device_id = "<NULL>";
      this.email = "<NULL>";
      this.estimated_earningyrly = 0;
      this.expected_earnings = "<NULL>";
      this.gpu = "<NULL>";
      this.gpuEarningsYrly = 0;
      this.gpu_vram = "<NULL>";
      this.IP = "<NULL>";
      this.isPaid = "false";
      this.lifetimePotential = 0;
      this.mac_address = "<NULL>";
      this.monthlyPotential = 0;
      this.name = "<NULL>";
      this.paidOn = undefined;
      this.payout_method = "PayPal (default)"; // hardcoded, only has PayPal for now
      this.payout_requested = "No";
      this.payout_request_time = undefined;
      this.pcs = 0;
      this.potential_earningyrly = 0;
      this.ram_Gb = "<NULL>";
      this.rvnHashrate = 0;
      this.signedup = undefined;
      this.xmrHashrate = 0;
    }
  
    public static getInstance(): DebugInstance {
      if (!DebugInstance.instance) {
        DebugInstance.instance = new DebugInstance()
      }
      return DebugInstance.instance
    }
  
    public getSignedup = () => {
      return this.signedup ? this.signedup.toLocaleString() : "<NULL>"
    }

    public getPaidOn = () => {
      return this.paidOn ? this.paidOn.toLocaleString() : "<NULL>"
    }
  
  }
  
  export default DebugInstance
