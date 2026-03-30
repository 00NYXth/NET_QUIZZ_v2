const ALL_QUESTIONS = [
  // 1.1 Define network concepts
  {
    "question": "The ______ is the largest WAN in the world",
    "options": [
      "internet",
      "intranet",
      "WWW",
      "MSDN"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "A private network that allows members of an organization to exchange data is an:",
    "options": [
      "Extranet",
      "Ethernet",
      "Intranet",
      "Internet"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Two companies want to share data by using the Internet. Which type of network provides the solution?",
    "options": [
      "Ethernet",
      "Intranet",
      "Extranet",
      "Perimeter"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What type of network can you set up that is another company's internal network?",
    "options": [
      "intranet",
      "extranet",
      "internet",
      "DMZ"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each statement about client-server networks, select True or False. A client-server network has centralized administration.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about client-server networks, select True or False. A client-server network requires each computer to share its resources.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each statement about client-server networks, select True or False. A client-server network requires users to have a user account on every computer they need to use.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Match the transmission type: assigned to a single network interface located on a specific subnet and used for one-to-one communications",
    "options": [
      "Multicast",
      "Broadcast",
      "Unicast"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Match the transmission type: assigned to one or more network interfaces located on various subnets and used for one-to-many communications",
    "options": [
      "Multicast",
      "Broadcast",
      "Unicast"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Match the transmission type: assigned to all network interfaces located on a subnet and used for one-to-everyone-on-a-subnet communications",
    "options": [
      "Multicast",
      "Broadcast",
      "Unicast"
    ],
    "correct": [1],
    "multiple": false
  },

  // 1.2 Define cloud and virtualization concepts
  {
    "question": "For each statement about hypervisors, select True or False. A Type 1 hypervisor runs directly on system hardware.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about hypervisors, select True or False. A Type 2 hypervisor runs directly on system hardware.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each statement about hypervisors, select True or False. A Type 1 hypervisor is also known as a bare-metal hypervisor.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "CompanyPro plans to migrate several servers to cloud-based virtual machines. You need to identify the administrative responsibilities that will be reduced after the planned migration. Which two responsibilities will be reduced? (Choose 2.)",
    "options": [
      "Backing up application data",
      "Managing permissions to shared documents",
      "Updating server operating systems",
      "Replacing failed server hardware",
      "Managing physical server security"
    ],
    "correct": [3, 4],
    "multiple": true
  },
  {
    "question": "An organization needs to move its infrastructure completely off-premises. Where should they locate their data center?",
    "options": [
      "A public cloud",
      "A private cloud",
      "A virtual machine",
      "A hybrid cloud"
    ],
    "correct": [0],
    "multiple": false
  },

  // 1.3 Describe remote access methods
  {
    "question": "What allows a user to connect to a corporate network using the internet?",
    "options": [
      "VPN",
      "VPC",
      "PPTP",
      "IPSec"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What is a VPN?",
    "options": [
      "A secure private connection over a public network",
      "A virtual network within your local area network (LAN)",
      "A communication tunnel between VLANs",
      "A personal network for your use only"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "VPNs are implemented to provide:",
    "options": [
      "A secure connection within a private network.",
      "A secure connection through public networks.",
      "Additional encryption by using IPSec.",
      "Additional security for selected computers."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which network element uses a tunneling protocol to encapsulate data for transmission?",
    "options": [
      "VPN",
      "NAT",
      "VLAN",
      "Internet"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPsec can be used to secure network communications between two machines.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPsec can be used to secure network communication between two networks.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPsec network traffic is always encrypted.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which component of IPSec generates the encryption and authentication keys?",
    "options": [
      "SA",
      "AH",
      "EP",
      "MPPE"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which IPSec component provides connectionless integrity and data authentication but does not provide confidentiality?",
    "options": [
      "SA",
      "AH",
      "ESP",
      "MPPE"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which IPSec component includes the most security, including confidentiality?",
    "options": [
      "SA",
      "AH",
      "ESP",
      "MPPE"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For which two reasons should you use IPsec between computers? (Choose two.)",
    "options": [
      "Data compression",
      "Data integrity",
      "Data redundancy",
      "Data confidentiality"
    ],
    "correct": [1, 3],
    "multiple": true
  },
  {
    "question": "You are configuring remote access for dial-in clients. You need to configure a solution that enables them to connect through standard phone lines without having access to the Internet. Which role should you install?",
    "options": [
      "Multipoint Services",
      "Network Policy and Access Services",
      "Remote Access",
      "Remote Desktop Services"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What would you use to create VPN tunnels so that users can connect to your internal network while at home using windows server 2008 R2?",
    "options": [
      "Microsoft RAS",
      "Microsoft RRAS",
      "Microsoft RDC",
      "Microsoft VPN Server"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "You use the ______ to connect to a terminal server",
    "options": [
      "Remote Desktop Connection (RDC)",
      "Remote Desktop Protocol (RDP)",
      "Remote Session Call (RSC)",
      "Remote NetBios Connection (RNC)"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which Microsoft network service can you use to establish a connection to a corporate LAN without any user action?",
    "options": [
      "VPN",
      "Remote Desktop",
      "DirectAccess",
      "Nap"
    ],
    "correct": [2],
    "multiple": false
  },

  // 2.1 Define the characteristics of local area networks (LANs)
  {
    "question": "A node within a local area network (LAN) must have which two of the following? (Choose two.)",
    "options": [
      "Username and password",
      "Share name",
      "NIC",
      "IP address",
      "Table of all network nodes"
    ],
    "correct": [2, 3],
    "multiple": true
  },
  {
    "question": "A node within a local area network (LAN) must have a network interface device and a:",
    "options": [
      "Network account",
      "Table of all network nodes",
      "Host address",
      "Resource to share"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "A network that separates an organization's private network from a public network is a/an:",
    "options": [
      "Firewall",
      "Extranet",
      "Perimeter",
      "Internet"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. You use a perimeter network to grant internal clients access to external resources.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A LAN has no access to the perimeter network.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A perimeter network typically contains servers that require Internet access, such as web or email servers.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What zone is used to publish external websites for an organization?",
    "options": [
      "intranet",
      "exanet",
      "internetwork",
      "DMZ"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What is the primary purpose of a perimeter network?",
    "options": [
      "to act as a hidden location to deploy network clients",
      "to act as a secure location for deploying highly sensitive network servers",
      "to provide a buffer area between a private intranet and the public Internet",
      "to monitor traffic between routed subnets in a private LAN"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "One purpose of a perimeter network is to:",
    "options": [
      "Make resources available to the intranet.",
      "Link campus area networks (CANs).",
      "Link local area networks (LANs).",
      "Make resources available to the Internet"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "One purpose of a perimeter network is?",
    "options": [
      "VLAN",
      "Microsoft ASP-NET",
      "Microsoft .NET Framework",
      "VPN"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which two servers should you place in a perimeter network? Choose 2",
    "options": [
      "NAT server",
      "database server",
      "secure file server",
      "DHCP server",
      "public web server"
    ],
    "correct": [0, 4],
    "multiple": true
  },
  {
    "question": "You work at a coffee shop. Your supervisor asks you to help set up a computer network. The network needs to have the following items: - A public facing web server - A Wi-Fi network for customers - A private network for the point of sale terminals - An office PC - A file/print server - A network printer. You need to set up a perimeter network to protect the network. Which two items should you include in the perimeter network? (Choose two.)",
    "options": [
      "Network printer",
      "Web server",
      "File server",
      "Wi-Fi network",
      "Point of sale terminals"
    ],
    "correct": [1, 3],
    "multiple": true
  },
  {
    "question": "You have a public facing web-server and want to protect internal network intrusion. What should you do?",
    "options": [
      "Configure the firewall to block access on ports 80 and 443",
      "Configure the server to block access to port 80 and 443",
      "Set the IP address of the web server to be within the LAN",
      "Deploy the web server in a DMZ"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. A \"secondary zone\" is the first DNS zone to which all updates for the records that belong to that zone are written. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Primary zone",
      "Stub zone",
      "Conditional forwarding zone",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What is a reason to incorporate VLANs into a network? (One reason to incorporate VLANs in a network is to)",
    "options": [
      "To reduce the number of nodes in a broadcast domain.",
      "To increase the number of available IP addresses.",
      "To reduce the number of broadcast domains.",
      "To increase the number of available Media Access Control (MAC) addresses."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What are two characteristics of VLANs? (Choose 2.)",
    "options": [
      "VLANs act as though they are on the same LAN regardless of physical location",
      "A VLAN can logically address packets by using IP",
      "A VLAN compartmentalizes a network and isolates traffic",
      "A single switch can service only a single VLAN"
    ],
    "correct": [0, 2],
    "multiple": true
  },
  {
    "question": "What are three advantages of VLANs? (Choose three.)",
    "options": [
      "They can logically address packets by using IP.",
      "They require a router to connect to VLANs on another switch.",
      "They compartmentalize a network and isolate traffic.",
      "They are efficient because a single switch can implement only a single VLAN.",
      "They act as though they are on the same LAN regardless of physical location."
    ],
    "correct": [1, 2, 4],
    "multiple": true
  },
  {
    "question": "To protect a network when it is connected to the Internet, you should use a:",
    "options": [
      "Bridge",
      "Firewall",
      "Switch",
      "Router"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. \"A/an virtual private network (VPN)\" protects a network's perimeter by monitoring traffic as it enters and leaves. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Extranet",
      "Firewall",
      "Intranet",
      "No change is needed"
    ],
    "correct": [1],
    "multiple": false
  },

  // 2.2 Define the characteristics of wide area networks (WANs)
  {
    "question": "For each statement about wide area networks (WANs), select True or False. The Internet is a wide area network (WAN)",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about wide area networks (WANs), select True or False. An intranet is a wide area network (WAN)",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each statement about wide area networks (WANs), select True or False. All devices connected to a WAN must be located within the same city.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which type of network covers the broadest area?",
    "options": [
      "WAN",
      "CAN",
      "LAN",
      "PAN"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which two of the following are connectivity options for wide area networks (WANs)? (Choose two.)",
    "options": [
      "Token ring",
      "Ethernet",
      "Dial-up",
      "Leased line"
    ],
    "correct": [2, 3],
    "multiple": true
  },
  {
    "question": "What are two advantages of using DSL for WAN connections? Choose 2",
    "options": [
      "DSL bypasses the need to use an ISP to connect to the Internet",
      "DSL supports higher bandwidth than cable modems and ISDN",
      "DSL provides a cost-effective way for small office/home office connections to the Internet",
      "DSL is the preferred method for WAN point-to-point links in an enterprise network",
      "DSL is implemented using standard telephone company service lines"
    ],
    "correct": [2, 4],
    "multiple": true
  },
  {
    "question": "You need to configure a VPN connection between two offices. You want to maximize the connection speed. Which connection should you use?",
    "options": [
      "ISDN",
      "Cable Modem",
      "T1",
      "DSL"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which connectivity option for wide area networks (WANs) is most readily available in most geographic areas?",
    "options": [
      "Leased line",
      "ISDN",
      "T1",
      "Dial-up"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "For each statement, select True or False. A leased line establishes a point-to-point link between two locations.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement, select True or False. A leased line is an always-on bidirectional connection.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement, select True or False. A leased line is limited to no more than 128 Kbps.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is the bit rate for a North American T3 circuit?",
    "options": [
      "6.312 Mbit/s",
      "44.736 Mbit/s",
      "274.176 Mbit/s",
      "400.352 Mbit/s"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "In Europe, what circuit would be similar to the T1 found in the United States?",
    "options": [
      "E1",
      "J1",
      "T2",
      "F1"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What speed does a T1 run at?",
    "options": [
      "1.544 Mbps",
      "2.889 Mbps",
      "3.101 Gbps",
      "2.54 Mbps"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which technology provides the highest bit rate?",
    "options": [
      "T1",
      "E1",
      "DS3",
      "ISDN"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "How many B channels does an ISDN PRI support?",
    "options": [
      "2",
      "8",
      "23",
      "48"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What technology uses wires from the telephone company to provide broadband internet connection?",
    "options": [
      "cable",
      "DSL",
      "FDDI",
      "frame relay"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which type of wide-area connection is available in the most geographic regions?",
    "options": [
      "T1",
      "Cable",
      "ISDN",
      "POTS"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "A university has network links at many locations. Where would a T3 connection be appropriate?",
    "options": [
      "computer lab PC to lab printer",
      "library laptop PC to Internet",
      "server to network in the main server room",
      "main campus to a large satellite campus"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "POTS, ISDN, and T1 use which type of switching?",
    "options": [
      "packet",
      "circuit"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. Plain old telephone service (POTS), most ISDN lines, and switched T1 lines are all examples of \"Message Switching\". Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Circuit Switching",
      "Packet Switching",
      "FDDI Switching",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What technology takes data and breaks them into packets and sends them over a network, sometimes using different routes for each packet?",
    "options": [
      "circuit switching",
      "connection switching",
      "packet switching",
      "network switching"
    ],
    "correct": [2],
    "multiple": false
  },

  // 2.3 Identify wireless networking methods and characteristics
  {
    "question": "Match the 802.11 standard: Frequency range: 5.1-5.8 Ghz, Data rate: 54 Mbps",
    "options": [
      "802.11a",
      "802.11b",
      "802.11g",
      "802.11n"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Match the 802.11 standard: Frequency range: 2.4-2.485 Ghz, Data rate: 11 Mbps",
    "options": [
      "802.11a",
      "802.11b",
      "802.11g",
      "802.11n"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Match the 802.11 standard: Frequency range: 2.4-2.485 Ghz, Data rate: 54 Mbps",
    "options": [
      "802.11a",
      "802.11b",
      "802.11g",
      "802.11n"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Match the 802.11 standard: Frequency range: 2.4-5.8 Ghz, Data rate: 65-600 Mbps",
    "options": [
      "802.11a",
      "802.11b",
      "802.11g",
      "802.11n"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The four IEEE standards, 802.11a, b, g, and n, are collectively known as \"mobile ad hoc\" networks. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "WiMAX",
      "Bluetooth",
      "WiFi",
      "No change is needed"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which two are published IEEE 802.11 wireless transmission standards? (Choose two.)",
    "options": [
      "802.11f",
      "802.11g",
      "802.11k",
      "802.11m",
      "802.11n"
    ],
    "correct": [1, 4],
    "multiple": true
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. 802.11n supports MIMO by using multiple antennas.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. 802.11n uses frame aggregation to increase efficiency.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. 802.11n uses channel bonding to use two channels at once so that bandwidth is doubled.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. 802.11ac is backward compatible with 802.11a/b/g/n.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. 802.11ac WAPs support simultaneous transmissions on the 2.4 and 5 Ghz frequency bands.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about 802.11 standards, select True or False. The maximum bandwidth for 802.11ac is 1.3 Gbps.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What wifi standards support 54Mbps and only at 2.5Ghz?",
    "options": [
      "802.11a",
      "802.11g",
      "802.11n"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The 802.11n wireless standard specifies a maximum data rate of 54 Mbps. Review the underlined text. If it makes the statement correct, select No change is needed. If the statement is incorrect, select the answer choice that makes the statement correct.",
    "options": [
      "10 Mbps",
      "11-128 Mbps",
      "300-600 Mbps",
      "No change is needed"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What happens when an 802.11a node broadcasts within the range of an 802.11g access point?",
    "options": [
      "The access point transmits, but the node is unable to receive.",
      "A connection occurs.",
      "Both the node and the access point are unable to transmit.",
      "The node transmits, but the access point is unable to receive."
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. In a wireless network that requires an SSL certificate, \"WEP\" handles the SSL certificate. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "802.1X",
      "WPA2-PSK",
      "WPA-PSK",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. \"WEP\" wireless encryption is the most susceptible to interception and decryption. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "WPA-AES",
      "WPA2",
      "WPA-PSK",
      "No change is needed"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which type of network is most vulnerable to intrusion?",
    "options": [
      "Dial-up",
      "Wireless",
      "Broadband",
      "Leased line"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What of the following is not a characteristic of 802.11n?",
    "options": [
      "frame aggregation",
      "channel bonding",
      "RFI protection",
      "MIMO"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each statement about ad hoc network, select True or False. An ad hoc network is a peer-to-peer network.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about ad hoc network, select True or False. An ad hoc network supports WEP, WPA, WPA2.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each statement about ad hoc network, select True or False. A wireless access network requires a wired router or switch to connect to a wired network.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each statement about ad hoc network, select True or False. A wireless access point (WAP) network is more secure than an ad hoc network.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which wireless authentication method provides the highest level of security?",
    "options": [
      "Wired Equivalency Privacy (WEP)",
      "IEEE 802.11n",
      "WI-FI Protected Access (WPA)",
      "IEEE 802.11a"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A wireless bridge connects Ethernet-based devices to the network.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A wireless bridge increases the wireless signal strength of the access point.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Wireless bridges always work in pairs.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which of these factors has the biggest impact on data transmission speed in a wireless network?",
    "options": [
      "The access method used for the network",
      "The transmission standard of the equipment used",
      "The use of strong encryption for transmissions",
      "The transmission wattage rating used on the NIC"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "On a wireless router, what is an SSID?",
    "options": [
      "The default administrator account",
      "The broadcast ID",
      "The default communication protocol",
      "A WAN encryption protocol"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is a cause of concern about wireless network security?",
    "options": [
      "The potential for cross-talk",
      "Inability to encrypt transmissions",
      "The radio broadcast access method",
      "Frequency modulation issues"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Security is a concern on wireless networks due to:",
    "options": [
      "The radio broadcast access method.",
      "Spread spectrum issues.",
      "Frequency modulation issues.",
      "The potential for cross-talk."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Attenuation in a wireless network signal is a result of:",
    "options": [
      "Number of wireless nodes connected.",
      "Distance from the access point.",
      "Interference from cellular phones.",
      "Encryption of the signal."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which wireless communication problem is caused by electromagnetic waves?",
    "options": [
      "Fading",
      "Attenuation",
      "Interference",
      "Diffraction"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "If an 802.11g Internet connection has connectivity problems, what may be the cause?",
    "options": [
      "Computer monitor",
      "A cellular phone",
      "Incandescent light",
      "A cordless phone"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "If an 802.11g Internet connection has connectivity problems, what may be the cause?",
    "options": [
      "A cordless phone",
      "A cellular phone",
      "Incandescent lights",
      "Electromagnetic interference (EMI)"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which is an example of external interference that can degrade the transmission quality of a UTP cable segment?",
    "options": [
      "Wireless access points",
      "Crosstalk",
      "Large electric motors",
      "Cell phones"
    ],
    "correct": [2],
    "multiple": false
  },

  // 2.4 Compare and contrast network topologies and access methods
  {
    "question": "Match the networking topologies: Each computer is connected by a single cable.",
    "options": [
      "Star",
      "Ring",
      "Mesh",
      "Bus"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Match the networking topologies: Each workstation acts as a repeater.",
    "options": [
      "Star",
      "Ring",
      "Mesh",
      "Bus"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Match the networking topologies: Each computer is connected to every other computer.",
    "options": [
      "Star",
      "Ring",
      "Mesh",
      "Bus"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "The topology of a local area network (LAN) is defined by the:",
    "options": [
      "Number of devices to connect.",
      "Physical and logical characteristics.",
      "Distance between workstations.",
      "Type of cable being used."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which physical network topology provides fault-tolerant communication by providing redundant communication paths?",
    "options": [
      "Bus",
      "Ring",
      "Star",
      "Mesh"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What are two characteristics of a mesh network topology? (Choose 2.)",
    "options": [
      "It works best for networks with a large number of nodes.",
      "Every node connects to every other node on the network.",
      "It is fault tolerant because of redundant connections.",
      "It requires less cabling than either a star or ring topology"
    ],
    "correct": [1, 2],
    "multiple": true
  },
  {
    "question": "A characteristic of the mesh topology is that it:",
    "options": [
      "Uses a central hub.",
      "Cannot use wired connections.",
      "Uses redundant paths.",
      "Cannot use wireless connections."
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "In which physical network topology is each computer connected to a central point?",
    "options": [
      "Star",
      "Mesh",
      "Ring",
      "Bus"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. All devices on your company network connect to the same network switch. This is an example of a physical star topology. Review the underlined text. If it makes the statement correct, select No change is needed.",
    "options": [
      "ring",
      "bus",
      "mesh",
      "No change is needed"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "In a physical star topology, the central device is referred to as a:",
    "options": [
      "Bridge",
      "Server",
      "segmenter",
      "Hub"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What are two advantages of using star topology rather than ring topology in a computer lab workgroup? (Choose two.)",
    "options": [
      "Failure of a central connectivity device does not bring down the entire network.",
      "A central connection point allows for flexibility and scalability.",
      "Data travels on redundant paths, so one cable cannot stop its transmission.",
      "A cable problem within the group affects two nodes, at most.",
      "Redundancy is an advantage of the star topology"
    ],
    "correct": [1, 3],
    "multiple": true
  },
  {
    "question": "At Ethernet 1000BaseT network is wired as a physical star using switches. What is the logical topology?",
    "options": [
      "mesh",
      "ring",
      "bus",
      "star"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What are two characteristics of the CSMA/CD access method? Choose 2",
    "options": [
      "It does a round robin search for requests to transmit from all nodes",
      "It signals its intent to transmit on the network",
      "It can be used with a physical bus topology",
      "It waits until the medium is idle before transmitting",
      "It can detect and compensate for packet collisions"
    ],
    "correct": [2, 3],
    "multiple": true
  },
  {
    "question": "What are two characteristics of the CSMA/CD access method? (Choose two.)",
    "options": [
      "It checks to see if a collision has been detected.",
      "It does a round robin search for requests to transmit from all nodes on the network.",
      "It signals its intent to transmit on the network.",
      "It waits until the transmission medium is idle."
    ],
    "correct": [0, 3],
    "multiple": true
  },
  {
    "question": "Which access method is used in a physical ring topology?",
    "options": [
      "collision",
      "token passing",
      "avoidance",
      "polling"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "In local area network (LAN) topologies, the primary media access methods are: (Choose two.)",
    "options": [
      "Contention",
      "Negotiation",
      "Kerberos",
      "Token passing"
    ],
    "correct": [0, 3],
    "multiple": true
  },
  {
    "question": "Which of the following determines the media access method that is used in a network?",
    "options": [
      "Number of hosts connected to the network",
      "Number of domain servers on the segment",
      "Maximum speed of the media",
      "Topology and protocols"
    ],
    "correct": [3],
    "multiple": false
  },

  // 3.1 Describe characteristics of switches
  {
    "question": "What is the most common central device used today to connect computers to a network?",
    "options": [
      "hub",
      "switch",
      "SOHO router",
      "VPN router"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which network device interconnects computers in a workgroup, is able to be remotely configured, and provides the best throughput?",
    "options": [
      "managed switch",
      "router",
      "unmanaged switch",
      "hub"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What are two differences between switches and hubs? (Choose two.)",
    "options": [
      "Switches are slower than hubs because of the extra addressing functions that switches perform.",
      "Switches send data to all of the computers that are connected to them for efficiency.",
      "Switches are capable of sending and receiving data at the same time.",
      "Switches identify the intended destination of the data that they receive."
    ],
    "correct": [2, 3],
    "multiple": true
  },
  {
    "question": "What are two characteristics of switches? (Choose two.)",
    "options": [
      "Switches identify the intended destination of the data that they receive",
      "Switches cause more data collisions than hubs",
      "Switches are capable of sending and receiving data at the same time",
      "Switches send each packet to all of the computer that are connected to them"
    ],
    "correct": [0, 2],
    "multiple": true
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A switch sends unicast packets to one destination port only.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A switch floods ports if it does not know where to send a packet.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A switch sends broadcast packets to the uplink port only.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "One reason to replace an unmanaged switch with a managed switch is to:",
    "options": [
      "Manage the routing tables.",
      "Support multiple VLANs.",
      "Reduce collision domains.",
      "Route between networks."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which type of port supports VLAN traffic between two switches?",
    "options": [
      "Virtual port",
      "WAN port",
      "Trunk port",
      "LAN port"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "In addition to switching, multilayer switches also:",
    "options": [
      "Provide Layer 3 routing functions.",
      "Interface with CAT3, CAT5, CAT5e, and fiber optics.",
      "Support 10 MB, 100 MB, and 1 GB local area network (LAN) ports.",
      "Operate by using only Layer 1 and 2 protocols."
    ],
    "correct": [0],
    "multiple": false
  },

  // 3.2 Describe characteristics of routers
  {
    "question": "What is an example of a network device that associates a network address with a port?",
    "options": [
      "Switch",
      "Router",
      "Hub",
      "DSL modem"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is the function of a router?",
    "options": [
      "directs data packets toward a destination network",
      "provide interconnections between different media types",
      "resolve MAC and IP addresses",
      "join subnets into larger broadcast domains"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Your network uses routers configured with the RIP router protocol. For each of the following statements, select Yes if the statement is true. Otherwise, select No. A route can contain no more than 15 hops.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Your network uses routers configured with the RIP router protocol. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Route changes are broadcast immediately through the network.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Your network uses routers configured with the RIP router protocol. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Route management becomes more efficient as the network grows.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Your network uses routers configured with the RIP router protocol. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Routes are calculated based on the number of hops required.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "If a router cannot determine the next hop for a packet, the router will:",
    "options": [
      "Forward the packet to the default route.",
      "Send the packet back to the packet's source.",
      "Broadcast the packet.",
      "Store the packet in the memory buffer."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which is not a routing protocol?",
    "options": [
      "EIGRP",
      "RIP",
      "OSPF",
      "TCP"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "______ is a route that must be manually defined on each router",
    "options": [
      "static",
      "dynamic",
      "persistent",
      "global"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "A router's static route is set by the:",
    "options": [
      "Adjacent network",
      "Next upstream router",
      "Network administrator",
      "Routing protocol"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What is an advantage of dynamic routing?",
    "options": [
      "It automatically maintains routing tables.",
      "It limits traffic derived from routing protocols.",
      "It reduces broadcast traffic.",
      "It automatically enables DHCP."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which routing option is fault tolerant?",
    "options": [
      "Static routing",
      "The default route",
      "Dynamic routing",
      "Least-cost routing"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Dynamic Routing provides the ability to add networks automatically by learning them from other RIP routers.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Dynamic Routing provides the ability to automatically remove routes from the routing table when other RIP neighbors delete them.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Dynamic Routing provides the ability to select the best route based on routing metrics.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Your school network has multiple routers. Students in one of the dorms report that they cannot connect to the email server. You verify that the email server is operational. You suspect that the router on the subnet is causing the problem. Which two actions should you perform? (Choose 2.)",
    "options": [
      "Enable dynamic routing.",
      "Look in the router's NAT table.",
      "Enable multicast.",
      "Look in the router's routing table."
    ],
    "correct": [0, 3],
    "multiple": true
  },
  {
    "question": "You work for a small office that has 15 computers. Your local ISP provides you with one public IP address. You need to enable internet access for all 15 computers. Which routing function should you enable?",
    "options": [
      "Static routing",
      "NAT",
      "Port forwarding (PAT)",
      "RIP"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "How is a router's static routing table updated?",
    "options": [
      "By monitoring adjacent subnets",
      "Through direct action by the network administrator",
      "With updates from the physically nearest routers",
      "From the RIP protocol after resetting the router"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which metric does Routing Information Protocol (RIP) use to determine the least costly route?",
    "options": [
      "Delay",
      "Host ID",
      "Hop count",
      "Interface"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What routing protocol is the most popular distance-vector routing algorithm used to determine the best routes within a network?",
    "options": [
      "RIP",
      "OSPF",
      "BGP",
      "IGMP"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What routing protocol is the most popular link-state protocol used within a large organization?",
    "options": [
      "RIP",
      "OSPF",
      "BGP",
      "IGMP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "When a packet traverses a network, each router is a ______",
    "options": [
      "jump point",
      "CSU/DSU",
      "jump switch",
      "hop"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "OSPF uses bandwidth and delay as routing metrics.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "RIP calculated routes can contain no more than 15 hops.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "OSPF takes longer than RIP to update router tables based on changing conditions.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "RIP generates more update traffic than OSPF.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "RIP automatically adds networks to the routing table.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "RIP automatically removes routes from the routing table.",
    "options": [
      "True",
      "False"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "RIP determines routes based on bandwidth and availability.",
    "options": [
      "True",
      "False"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What feature within windows allows the server to act as a router?",
    "options": [
      "IPSec",
      "DHCP",
      "IP forwarding",
      "RDC"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which two features of a Windows Server 2008 R2 server should you install to use that server as a software router? (Choose two.)",
    "options": [
      "Network Policy and Access Services",
      "Routing and Remote Access Services",
      "Remote Administration",
      "DirectAccess"
    ],
    "correct": [0, 1],
    "multiple": true
  },
  {
    "question": "______ uses a clocking circuit to control the timing of communications between two WAN devices such as router",
    "options": [
      "static route",
      "dynamic route",
      "PPTP route",
      "point to point"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Quality of Service (QoS) allows you to define the priority traffic on the network.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Quality of Service (QoS) allows you to control bandwidth.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Quality of Service (QoS) allows you to assign protocols dynamically.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which two policies can you configure through QoS policy settings?",
    "options": [
      "set traffic priority on receiving computer IP address",
      "optimize routes based on available bandwidth",
      "optimize routes based on hop count",
      "set traffic priority based on the receiving application",
      "set traffic priority based on the sending computer IP address"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "You need to divide a network into three subnets. Which device should you use?",
    "options": [
      "Hub",
      "Bridge",
      "Router",
      "Segmenter"
    ],
    "correct": [2],
    "multiple": false
  },

  // 3.3 Describe characteristics of physical media
  {
    "question": "What is the most common cable used today?",
    "options": [
      "UTP",
      "STP",
      "Coaxial",
      "Fiber"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What are two characteristics of fiber optic cable? (Choose two.)",
    "options": [
      "Conducts electricity",
      "Requires metal conduit",
      "Supports splicing",
      "Requires a polish for end connectors"
    ],
    "correct": [2, 3],
    "multiple": true
  },
  {
    "question": "What are two characteristics of wired Ethernet network topology? Choose 2",
    "options": [
      "It uses tokens to avoid collisions on the network",
      "It is typically employed using twisted pair or fiber optic media",
      "It uses network adapters physically encoded with an IP address",
      "It can negotiate different transmission speeds"
    ],
    "correct": [1, 3],
    "multiple": true
  },
  {
    "question": "What are three characteristics of Ethernet network topology? (Choose three.)",
    "options": [
      "It uses tokens to avoid collisions on the network.",
      "It can use coaxial, twisted pair, and fiber optic media.",
      "It comprises the largest share of the networks in place today.",
      "It is a non-switching protocol.",
      "It can negotiate different transmission speeds."
    ],
    "correct": [1, 2, 4],
    "multiple": true
  },
  {
    "question": "A cable that meets the 1000BaseT standard has a maximum length of:",
    "options": [
      "100 m",
      "250 m",
      "500 m",
      "1,000 m"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What is the minimum cabling requirement for a 100BaseTX network?",
    "options": [
      "Category 3 UTP cable",
      "Category 5 UTP cable",
      "Category 6 UTP cable",
      "Multimode fiber cable"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is the maximum cable length for a single Cat5 UTP cable run?",
    "options": [
      "285 feet/86.87 meters",
      "328 feet/99.97 meters",
      "432 feet/131.67 meters",
      "600 feet/182.88 meters"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of these cable types transmits data the greatest distance?",
    "options": [
      "Multi-mode fiber",
      "Single-mode fiber",
      "Cat5e",
      "Cat6"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which feature of Category 5e STP cable reduces external interference?",
    "options": [
      "Crosstalk",
      "Shielding",
      "Length",
      "Twisting"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "To directly connect the Ethernet network interface cards (NICs) of two computers, you should use a:",
    "options": [
      "Crossover cable",
      "Straight cable",
      "Rollover cable",
      "Coaxial cable"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "If you are making a crossover cable and one end is 568A, what should the other end be?",
    "options": [
      "568A",
      "568B",
      "568C",
      "BOGB"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is a justification for using STP cable instead of UTP cable to wire a network expansion?",
    "options": [
      "You are routing cables through an area with high external interference.",
      "You want to minimize the costs relating to the new installation.",
      "You need to reduce attenuation.",
      "You need the cable to be as light and flexible as possible."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which media type is least susceptible to external interference including EMI and RFI?",
    "options": [
      "fiber optic",
      "STP",
      "UTP",
      "wireless"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "You need to install a network cable between two locations that are six miles from each other. What should you use?",
    "options": [
      "multi-mode fiber",
      "single-mode fiber",
      "Cat5e",
      "Cat6"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "You need to run four Ethernet network drops. Each drop is approximately 125 feet/46.33 meters. An interference exists along the path of each drop. You need to ensure that interference is reduced. Which cable type should you use?",
    "options": [
      "STP Cat5e",
      "UTP Cat5e",
      "Cat3",
      "UTP Cat6"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "The type of connector used on a 100BaseT Ethernet cable is:",
    "options": [
      "RJ-11",
      "RJ-45",
      "TNC",
      "BNC"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "You are home for vacation, and a family member wants your help to purchase and install network cable for a home office. The cable needs to support at least 300 Mbps. What is the least expensive option that meets this requirement?",
    "options": [
      "Cat3",
      "Cat5",
      "Cat5e",
      "Cat6"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "When a signal degrades as it runs through a wire, you have",
    "options": [
      "degradation",
      "attenuation",
      "cross over",
      "resistance"
    ],
    "correct": [1],
    "multiple": false
  },

  // 4.1 Describe the Open Systems Interconnection (OSI) model
  {
    "question": "How many layers does the TCP/IP model have?",
    "options": [
      "3",
      "4",
      "6",
      "7"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which layer in the OSI model is included in the TCP/IP model?",
    "options": [
      "Physical",
      "Data Link",
      "Transport",
      "Application"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which layer in the OSI model covers routing between networks?",
    "options": [
      "physical",
      "data link",
      "network",
      "transport"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "______ is used to send packets from one network to another network",
    "options": [
      "routing",
      "transport",
      "BGP",
      "encapsulation"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. Every router today is \"TCP/IP\" enabled, which is an industry-standard protocol that you use on the Internet and for local addressing. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "HTTP",
      "FTP",
      "SNMP",
      "No change is needed"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What model is used to describe how data communication occurs between hosts?",
    "options": [
      "server-centric model",
      "workgroup model",
      "peer-to-peer model",
      "OSI reference model"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. An ICMP ping message is sent at the application layer of the OSI model. Review the underlined text. If it makes the statement correct, select No change is needed. If the statement is incorrect, select the answer choice that makes the statement correct.",
    "options": [
      "network",
      "transport",
      "data-link",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which layer in the OSI model covers HTTP, FTP, and RDC?",
    "options": [
      "Physical",
      "Session",
      "Application",
      "Presentation"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which two functions are implemented at the application layer of the OSI model? Choose two.",
    "options": [
      "remote file services",
      "data encryption/decryption",
      "data compression",
      "directory services"
    ],
    "correct": [0, 3],
    "multiple": true
  },
  {
    "question": "What layer in the OSI model is used to encrypt data?",
    "options": [
      "Physical",
      "Session",
      "Application",
      "Presentation"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. All session data is \"encrypted between all machines\" while using telnet. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Not encrypted",
      "Encrypted between any Windows machines",
      "Encrypted only to any non-Windows machines",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. According to the OSI model, encryption takes place on the \"transport layer\". Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Presentation",
      "Network",
      "Application",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Encryption takes place at what layer of the OSI Model?",
    "options": [
      "7",
      "6",
      "4"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "POP3 is in what layer of the OSI model?",
    "options": [
      "7",
      "4",
      "2"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which layer of the OSI model includes VLANs?",
    "options": [
      "Physical",
      "Data Link",
      "Network",
      "Transport"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "NetBIOS protocol is what layer of the OSI model?",
    "options": [
      "network",
      "session",
      "transport"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which layer in the OSI model is used to verify that data was delivered without error?",
    "options": [
      "Physical",
      "Data Link",
      "Network",
      "Transport"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which protocol do you use as the transport protocol for a video application?",
    "options": [
      "TCP",
      "UDP",
      "FTP",
      "RDC"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of the following is a Layer 2 WAN protocol?",
    "options": [
      "Point-to-Point Protocol (PPP)",
      "Simple Network Management Protocol (SNMP)",
      "Transmission Control Protocol (TCP)",
      "Internet Protocol (IP)"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "In which OSI layer does routing occur?",
    "options": [
      "Transport",
      "Network",
      "Data Link",
      "Physical"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "A network device that associates a Media Access Control (MAC) address with a port is a:",
    "options": [
      "DSL modem",
      "Hub",
      "Router",
      "Switch"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which type of switch can provide a layer 3 function?",
    "options": [
      "managed switch",
      "multi layer switch",
      "unmanaged switch"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "A Layer 2 device that connects multiple computers within a network is a:",
    "options": [
      "Repeater",
      "Switch",
      "Router",
      "Packet"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What is an example of a Layer 3 device that connects multiple computers and networks?",
    "options": [
      "Packet",
      "Repeater",
      "Switch",
      "Router"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What is a similarity between Layer 2 and Layer 3 switches?",
    "options": [
      "Both provide a high level of security to the network.",
      "Both use logical addressing to forward transmissions.",
      "Both forward packets onto the network.",
      "Both allow the implementation of VLANs."
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What is the purpose of a Media Access Control (MAC) address?",
    "options": [
      "identify a network device to the Internet",
      "uniquely identify a physical network device",
      "manage permissions for shared network resources",
      "provide a routing address on a local area network (LAN)"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of the following represents a Media Access Control (MAC) address?",
    "options": [
      "GV:ZC:KK:DK:FZ:CA",
      "255.255.255.0",
      "05:35:AB:6E:Al:25",
      "127.0.0.1"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "A Media Access Control (MAC) address identifies a/an:",
    "options": [
      "UPnP device.",
      "Local broadcast domain.",
      "Network interface card (NIC).",
      "Local area network (LAN)."
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which protocol is used to translate IP addresses to MAC addresses?",
    "options": [
      "RARP",
      "ARP",
      "DNS",
      "WINS"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. An Address Resolution Protocol (ARP) table is used to associate IP addresses with \"host names\". Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "MAC addresses",
      "HomeGroup membership",
      "Preferred routers",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The protocol that maps IP addresses to a Media Access Control (MAC) address is Domain Name Systems (DNS). Review the underlined text. If it makes the statement correct, select No change is needed. If the statement is incorrect, select the answer choice that makes the statement correct.",
    "options": [
      "Address Resolution Protocol (ARP)",
      "Dynamic Host Configuration Protocol (DHCP)",
      "Routing Information Protocol (RIP)",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },

  // 4.2 Describe the Transmission Control Protocol (TCP) model
  {
    "question": "Match each protocol to its description. Connectionless, message-based protocol with best-effort service",
    "options": [
      "TCP",
      "UDP",
      "ARP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Match each protocol to its description. Connection-oriented protocol with guaranteed service",
    "options": [
      "TCP",
      "UDP",
      "ARP"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Match each protocol to its description. Resolves a MAC address to an IP address",
    "options": [
      "TCP",
      "UDP",
      "ARP"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. HTTP, TELNET, FTP, and SMTP protocols operate on Layer 7 of the OSI model.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Layer 4 of the OSI model controls dialogue between computers.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. Layer 3 of the OSI model controls routing between network devices.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which protocol is a transport layer protocol?",
    "options": [
      "FTP",
      "IP",
      "UDP",
      "ASCII"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which of these is an application layer protocol?",
    "options": [
      "TCP",
      "FTP",
      "IP",
      "UDP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which protocol is responsible for automatically assigning IP addresses?",
    "options": [
      "HTTP",
      "DHCP",
      "DNS",
      "WINS"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which protocol can be used to encrypt packets on the Internet?",
    "options": [
      "SNMP",
      "HTTPS",
      "TFTP",
      "HTTP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "At what layer in the OSI model are hardware addresses referenced?",
    "options": [
      "Network",
      "Application",
      "Data link",
      "Physical"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "ICMP and ARP protocol is what layer of the OSI model?",
    "options": [
      "2",
      "4",
      "3"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "TCP/IP and IPX/SPX are known as _________ stacks.",
    "options": [
      "Protocols",
      "Services",
      "Layers",
      "Lenses"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The TCP/IP model has four layers, which correspond with the OSI model's seven layers.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The TCP/IP application layer corresponds with the top four layers of the OSI model.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The TCP/IP transport and Internet layers correspond with layers 3 and 4 of the OSI model.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What is the advantage of UDP over TCP?",
    "options": [
      "Less Overhead - Faster Performance",
      "Older - Larger pool of compatible hardware",
      "TCP is not IPv6 compatible UDP is",
      "UDP can operate at Layer 1"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "______ protocol guarantees delivery",
    "options": [
      "TCP",
      "UDP"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "An Action Center alert recommends that you enable Windows Firewall. After enabling the firewall, you can no longer access websites. Which two TCP ports should you add exceptions for on the firewall? (Choose two.)",
    "options": [
      "Port 21",
      "Port 23",
      "Port 25",
      "Port 80",
      "Port 443"
    ],
    "correct": [3, 4],
    "multiple": true
  },

  // 4.3 Describe IPv4 concepts
  {
    "question": "Match each IP address to its corresponding IPv4 address class. 64.123.12.1",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Match each IP address to its corresponding IPv4 address class. 133.234.23.2",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Match each IP address to its corresponding IPv4 address class. 201.111.22.3",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Match each IP address to its corresponding IPv4 address class. 224.100.20.3",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. An IPv4 address consists of 64 bits.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. It is standard practice to divide the binary bits of an IPv4 address into 8-bit fields named octets.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The value of any IPv4 octet can be from 0 to 256.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of the following is a public address?",
    "options": [
      "10.1.1.1",
      "178.16.1.1",
      "192.168.1.1"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of the following is a public IP address?",
    "options": [
      "10.156.89.1",
      "68.24.78.221",
      "172.16.152.48",
      "192.168.25.101"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which of these is a public address space?",
    "options": [
      "192.168.0.0/16",
      "197.16.0.0/12",
      "10.0.0.0/8",
      "172.16.0.0/12"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which network does the IP address 220.100.100.100 belong to?",
    "options": [
      "220.100.100.0/24",
      "220.100.100.1/24",
      "255.255.255.0/24",
      "255.255.255.1/24"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which subnet mask is valid?",
    "options": [
      "255.255.255.240",
      "255.255.255.228",
      "255.255.255.164",
      "255.255.255.245"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What is the default subnet mask for a Class C Internet network?",
    "options": [
      "255.255.255.252",
      "255.255.255.240",
      "255.255.255.192",
      "255.255.255.0"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which of these addresses is a multicast address?",
    "options": [
      "127.0.0.1",
      "169.254.0.1",
      "192.168.0.1",
      "224.0.0.1"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The loopback address of your computer is \"127.0.0.1\". Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "10.0.1.1",
      "169.254.0.5",
      "192168.1.1",
      "No change is needed"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "In which range are IPv4 multicast addresses?",
    "options": [
      "From 224.0.0.0 to 239.255.255.255",
      "From 127.0.0.0 to 127.255.255.255",
      "From 192.168.0.0 to 192.168.255.255",
      "From 172.16.0.0 to 172.31.255.255"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What ports are defined above 49,152?",
    "options": [
      "well-known ports",
      "registered ports",
      "dynamic ports",
      "sliding ports"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "A network is configured with a single IPv4 subnet. You want to deploy a computer running Windows Server 2016 to use as a file server. What two parameters are required? Choose 2",
    "options": [
      "default gateway",
      "Mac address",
      "IP address",
      "Primary DNS server",
      "Subnet mask"
    ],
    "correct": [2, 4],
    "multiple": true
  },
  {
    "question": "The default gateway address identifies the:",
    "options": [
      "Device that will connect the computer to the local network.",
      "Device that will connect the computer to a remote network.",
      "Server that will provide name services for the computer.",
      "Server that will authenticate the user of the computer."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. Each IPv4 address consists of a MAC address and data-link layer address. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Network ID and a host ID",
      "DNS record and a default route",
      "64-bit binary number divided into octets",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },

  // 4.4 Describe IPv6 concepts
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPv6 addresses are 64-bit in length.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPv6 addresses are divided into 8-bit blocks.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. IPv6 addresses are represented by dotted-decimal notation.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. 0:0:0:0:0:0:0:1 is the Loopback address for IPv6.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. FEC0:9C5A is a valid Site-Local IPv6 address.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. FE80:F856:02AA is a valid Link-Local (APIPA) IPv6 address.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. 21DA:D3:0:2F3B:2AA:FF:FE28:9C5A is a valid IPv6 unicast address.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. FE80::2AA:FF:FE28:9C5A is a valid IPv6 address.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. 21DA:02AA:::FF:FE28:9C5A is a valid IPv6 address.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "How many bits are there in an Internet Protocol version 6 (IPv6) address?",
    "options": [
      "32",
      "64",
      "128",
      "256"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which option represents an IPv6 loopback address?",
    "options": [
      "::",
      "FF00::127",
      "FE80::127",
      "::1"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What is the IPv6 APIPA address?",
    "options": [
      "FEC0:",
      "FE80:",
      "FFF:"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which is a IPv4 to IPv6 tunneling protocol?",
    "options": [
      "DHCP",
      "RDP",
      "teredo"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which of these represents the Internet Protocol version 6 (IPv6) loopback address?",
    "options": [
      "127.0.0.1",
      "192.168.0.1",
      "FEC0:A8C0::AA01",
      "::1"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Teredo tunneling is a protocol that:",
    "options": [
      "Translates Internet Protocol version 4 (IPv4) to Internet Protocol version 6 (IPv6).",
      "Allows IPv6 connectivity through IPv4 devices.",
      "Provides VPN security.",
      "Dynamically allocates IPv6 addresses."
    ],
    "correct": [1],
    "multiple": false
  },

  // 4.5 Identify well-known ports
  {
    "question": "Which port categories include inbound ports of HTTP, HTTPS, FTP, and DNS?",
    "options": [
      "well-known ports",
      "registered ports",
      "dynamic ports",
      "private ports"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What port does remote desktop services use?",
    "options": [
      "443",
      "501",
      "389",
      "3389"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "An Action Center alert recommends that you enable Windows Firewall. After enabling the firewall, you can no longer access websites. Which two TCP ports should you add exceptions for on the firewall? (Choose two.)",
    "options": [
      "Port 21",
      "Port 23",
      "Port 25",
      "Port 80",
      "Port 443"
    ],
    "correct": [3, 4],
    "multiple": true
  },

  // 4.6 Describe name resolution concepts
  {
    "question": "What server is used to translate host names to IP addresses?",
    "options": [
      "DNS",
      "WINS",
      "HOSTS",
      "DHCP"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What provides name resolution between domain names and IP addresses?",
    "options": [
      "DHCP",
      "DNS",
      "ARP",
      "RPC"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What information is contained in a client computer's HOSTS file?",
    "options": [
      "NetBIOS name to IP address mappings",
      "a list of local DNS Servers",
      "FQDN to IP address mapping",
      "a list of Internet and root DNS servers"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What is the first step in the DNS name resolution process?",
    "options": [
      "The client checks the LMHOSTS file for an entry to the name",
      "The client checks its HOSTS file for an entry to the name",
      "The client checks to see if the name being resolved is its own name"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "The service that resolves fully qualified domain names (FQDN) to IP addresses is:",
    "options": [
      "Windows Internet Name Service (WINS).",
      "Domain Name Service (DNS).",
      "Internet Service Provider (ISP).",
      "Address Resolution Protocol (ARP)."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "A service that resolves NetBIOS names to IP addresses is:",
    "options": [
      "Domain Name Service (DNS).",
      "Internet Service Provider (ISP).",
      "Address Resolution Protocol (ARP).",
      "Windows Internet Name Service (WINS)."
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What service on a windows network is used to translate between NetBIOS name/computer name and IP addresses?",
    "options": [
      "DNS",
      "WINS",
      "DHCP",
      "LDAP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which service uses PTR and A records?",
    "options": [
      "IPS",
      "DNS",
      "NAT",
      "IDS"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The process of replicating a zone file to multiple DNS servers is called zone replication. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Zone transfer",
      "Zone synchronization",
      "Start of authority",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "You ping a server by using fully qualified domain name (FQDN) and do not receive a response. You then ping the same server by using its IP address and receive a response. Why do you receive a response on the second attempt but not on the first attempt?",
    "options": [
      "PING is improperly configured.",
      "The DNS is not resolving.",
      "The DHCP server is offline.",
      "NSLOOKUP is stopped."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What type of DNS resource record maps an IP address to a fully qualified domain name (FQDN)?",
    "options": [
      "CNAME",
      "PTR",
      "AAAA",
      "A"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which DNS record type represents a Microsoft Exchange Server?",
    "options": [
      "CNAME",
      "AAAA",
      "MX"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which DNS record type represents an alias of a certain record?",
    "options": [
      "CNAME",
      "AAAA",
      "MX"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What type of record does DNS use to find a mail service?",
    "options": [
      "Service (SRV) DNS record",
      "Canonical (CNAME) DNS record",
      "Mail Exchanger (MX) DNS record",
      "Host (A) DNS record"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What type of DNS record maps host names to addresses?",
    "options": [
      "Mail Exchanger (MX) DNS record",
      "Service (SRV) DNS record",
      "Host (A) DNS record",
      "Canonical (CNAME) DNS record"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which DNS record type specifies the host that is the authority for a given domain?",
    "options": [
      "NS",
      "MX",
      "CNAME",
      "SOA"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What is the DNS record type that specifies an alias name of another address record?",
    "options": [
      "MX",
      "CNAME",
      "NS",
      "SOA"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. The \"NTP\" value in a resource record indicates a length of time that other DNS servers use to determine how long to cache information for a record before expiring and discarding it. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "TTL",
      "GPS",
      "SOA RR",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. With a recursive DNS query, the DNS server will contact any other DNS servers it knows about to resolve the request.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. When an iterative query cannot be resolved from local data, such as local zone files or a cache of previous queries, the query needs to be escalated to a root DNS server.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. A DNS server makes an iterative query as it tries to find names outside of its local domain when it is not configured with a forwarder.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "______ query is when the DNS server sends request to the root server?",
    "options": [
      "advanced",
      "iterative",
      "complex"
    ],
    "correct": [1],
    "multiple": false
  },

  // 4.7 Identify the roles of networking services
  {
    "question": "What protocol automatically configures IP configuration for a client?",
    "options": [
      "DNS",
      "DHCP",
      "WINS",
      "FTP"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What protocol is used with L2TP to provide encryption? (What protocol is used with L2TP to encrypt data?)",
    "options": [
      "IPsec",
      "MPPE",
      "HTTPS",
      "MSC-CHAP"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which of the following are features of DHCP? (Choose two.)",
    "options": [
      "IP address resolution to canonical names",
      "Secure shell connections",
      "Address reservation",
      "Network file transfer",
      "IP address exclusion"
    ],
    "correct": [2, 4],
    "multiple": true
  },
  {
    "question": "A computer that has an IP address of 169.254.0.1 cannot access the network. Which of the following services should you confirm is available?",
    "options": [
      "WINS",
      "DNS",
      "DHCP",
      "TFTP"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. When a client computer is unable to reach a DHCP server, it will automatically assign an IP address in the 10.0.0.0 -10.0.0.255 range. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "127.0.0.0-127.0.0.255",
      "169.254.0.0-169.254.255.255",
      "192.168.100.0 -192.168.100.255",
      "No change is needed"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "You need to configure DHCPServ with scopes to support both subnets. What needs to be done on the other subnet?",
    "options": [
      "Configure the router to support DHCP messages and BOOTP messages",
      "Deploy a DHCP relay in the other subnet",
      "Reconfigure both subnets with the same set of addresses",
      "Deploy a NAT Server"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What happens when a client's DHCP-issued address expires?",
    "options": [
      "The client continues to use the address until it is notified to stop.",
      "The client generates a new address valid to the subnet and requests approval from the DHCP server.",
      "The client disconnects from the network.",
      "The client attempts to renew its lease on the address."
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Network client computers running Windows 8.1 and Windows 10 are configured to receive IPv4 addresses through DHCP. The DHCP server fails. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Clients will attempt to renew address leases when they are halfway through the lease period.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Network client computers running Windows 8.1 and Windows 10 are configured to receive IPv4 addresses through DHCP. The DHCP server fails. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Clients will continue to use their address throughout the lease period.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Network client computers running Windows 8.1 and Windows 10 are configured to receive IPv4 addresses through DHCP. The DHCP server fails. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Clients will continue to use their addresses after the lease period until a DHCP server becomes available.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Your home computer is having problems accessing the Internet. You suspect that your Internet router's DHCP service is not functioning, so you check your computer's IP address. Which address indicates that your router's DHCP service is NOT functioning?",
    "options": [
      "169.254.1.15",
      "172.16.1.15",
      "192.168.1.15",
      "10.19.1.15"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Connecting to a private network address from a public network requires:",
    "options": [
      "Network address translation (NAT).",
      "Dynamic Host Configuration Protocol (DHCP).",
      "Network Access Protection (NAP).",
      "Dynamic domain name system (DDNS)."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which of the following services masks internal IP addresses from outside the network?",
    "options": [
      "DHCP",
      "WINS",
      "NAT",
      "DNS"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "You deploy a server running Windows Server 2016 and install Remote Access Server. What do you need to configure to access the Internet and navigate multiple web sites?",
    "options": [
      "DHCP",
      "NAT",
      "WAP",
      "VPN"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "The query protocol used to locate resources on a network is:",
    "options": [
      "User Datagram Protocol (UDP).",
      "Lightweight Directory Access Protocol (LDAP)",
      "Tracert",
      "Telnet."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "If a router is installed so that it separates a DHCP server from its clients, the clients will:",
    "options": [
      "Immediately lose connectivity to all segments.",
      "Be unable to obtain their leases from the server.",
      "Immediately lose connectivity to the local segment.",
      "Receive an immediate renewal of their lease."
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "This question requires that you evaluate the underlined text to determine if it is correct. IPSec policies for two machines on a LAN can be modified by using the \"IPSec policy snap-in\" on Windows 7. Select the correct answer if the underlined text does not make the statement correct.",
    "options": [
      "Windows Firewall with Advanced Security snap-in",
      "LAN adapter properties",
      "Remote Access snap-in",
      "No change is needed"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "You are helping a friend set up a public-facing web server for a home office. Your friend wants to protect the internal network from intrusion. What should you do?",
    "options": [
      "Set the web server in a perimeter network.",
      "Set the web server to block access on ports 80 and 443.",
      "Configure the firewall to block access on ports 80 and 443.",
      "Set the IP address of the web server to be within the LAN."
    ],
    "correct": [0],
    "multiple": false
  },

  // 5.1 Given a scenario, describe the troubleshooting process in a small-medium business network
  {
    "question": "You are a network administrator at a small business. An employee is not able to access any websites. No other employees are having this problem. All computers are on the same intranet. You need to troubleshoot the problem. Which three actions should you complete? (Choose 3)",
    "options": [
      "Ensure that the router has a connection to the internet.",
      "Contact the internet service provider.",
      "Check the employee's network adapter to verify that it is working.",
      "Check to see if the router is working properly.",
      "Determine whether the employee's computer has a valid IP address.",
      "Check the DNS settings on the employee's computer."
    ],
    "correct": [2, 4, 5],
    "multiple": true
  },
  {
    "question": "You are a network administrator at a small business. One morning at the start of business, you realize that no employees at the company can access external websites. However, all employees have the same intranet connected by a single router. You need to troubleshoot the problem. Which two actions should you complete? (Choose 2)",
    "options": [
      "Check the router for proper physical connectivity.",
      "Check that each computer has a valid IP address.",
      "Contact the internet service provider.",
      "Check for bad network adapters on individual computers"
    ],
    "correct": [0, 2],
    "multiple": true
  },

  // 5.2 Given a scenario, use the appropriate hardware troubleshooting tools
  {
    "question": "A computer is connected to a switch through a network patch panel by using copper cable. The computer is getting lower-than-expected data speeds. Which two actions should you perform to identify the issue? (Choose 2.)",
    "options": [
      "Test the data speed of the cable",
      "Use an optical time-domain reflectometer (OTDR) to test the line.",
      "Search for broken wires in the cable by using a cable tester.",
      "Tone the line from Unit A to Unit B"
    ],
    "correct": [0, 2],
    "multiple": true
  },
  {
    "question": "The fiber network connection between Building A and Building B is 550 meters. There is attenuation on the line. Which tool should you use to test this?",
    "options": [
      "Multimeter",
      "Time-domain reflectometer (TDR)",
      "Toner",
      "Optical time-domain reflectometer (OTDR)"
    ],
    "correct": [3],
    "multiple": false
  },

  // 5.3 Given a scenario, use the appropriate Windows software tools to troubleshoot a problem
  {
    "question": "What command is used to add static routes to a windows computer?",
    "options": [
      "nslookup",
      "telnet",
      "route",
      "nbtstat"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What command do you use to display the routing table on a local system?",
    "options": [
      "route display",
      "route table",
      "route local",
      "route print"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Which command shows the public IP information for a certain domain name?",
    "options": [
      "netstat",
      "nslookup",
      "tracers"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "On a Windows computer, which utility should you use to determine whether your Domain Name System (DNS) service is properly resolving fully qualified domain names (FQDNs) to IP addresses?",
    "options": [
      "netstat",
      "nslookup",
      "nbtstat",
      "ipconfig"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which setting is used to determine the Domain Name System (DNS) settings on a client computer?",
    "options": [
      "TELNET",
      "NSLOOKUP",
      "PATHPING",
      "NETSTAT"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "On a Windows computer, which utility should you use to determine whether your Domain Name System (DNS) service is properly resolving fully qualified domain names (FQDNs) to IP addresses?",
    "options": [
      "ipconfig",
      "nbtstat",
      "nslookup",
      "netstat"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What command do you use to connect to a remote computer so that you can execute commands?",
    "options": [
      "ftp",
      "nslookup",
      "telnet",
      "nbstat"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What command can you use to connect to a mail server so that you can test SMTP?",
    "options": [
      "ftp",
      "nslookup",
      "telnet",
      "nbstat"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What command do you use to display and modify the network configuration of a local computer?",
    "options": [
      "netsh",
      "netstat",
      "telnet",
      "nbtstat"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "______ is the command you run to view your IP information on a Windows PC?",
    "options": [
      "ifconfig",
      "netconfig",
      "ipconfig"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What command do you use to display the MAC address on system?",
    "options": [
      "ipconfig/all",
      "pathping --m",
      "route /showmac",
      "nbstat -r"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "What command do you use to register the computer's name and IP address with the nearest DNS server?",
    "options": [
      "ipconfig /renew",
      "ipconfig /renew aall",
      "ipconfig /flushdns",
      "ipconfig /registerdns"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What command do you use to retrieve or update your DHCP assigned configuration?",
    "options": [
      "ipconfig /flushdns",
      "ipconfig /all",
      "ipconfig /release",
      "ipconfig /renew"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "The ipconfig command will:",
    "options": [
      "Configure routers",
      "Configure DHCP clients",
      "Display a client's address",
      "Display a client's broadcast mode"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which command should you use to force a client computer to renew its address lease from a DHCP server?",
    "options": [
      "pathping",
      "ipconfig",
      "netstat",
      "netsh"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "What command do you use to release the IP configuration handed out by a DHCP server?",
    "options": [
      "ipconfig /renew",
      "ipconfig /releasedns",
      "ipconfig /savestatic",
      "ipconfig /release"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What command do you use to reacquire IP configuration from a DHCP server?",
    "options": [
      "ipconfig /renew",
      "ipconfig /releasedns",
      "ipconfig /savestatic",
      "ipconfig /release"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "The ping tool is used to: (Choose two.)",
    "options": [
      "Determine the network portion of a host address.",
      "Self-test a host's own network interface.",
      "Determine whether a host is reachable.",
      "Manage a host's session when UDP is used."
    ],
    "correct": [1, 2],
    "multiple": true
  },
  {
    "question": "The ping utility is used for which two purposes? Choose 2",
    "options": [
      "determine whether a host is reachable",
      "resolve host name to IP address",
      "search for duplicate address",
      "self-test a host's own network interface",
      "scan for open host firewall ports"
    ],
    "correct": [0, 3],
    "multiple": true
  },
  {
    "question": "Which command is used to verify that a server is connected to the network?",
    "options": [
      "IPCONFIG",
      "ROUTE",
      "PING",
      "CHECK"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "What option do you use to ping constantly until you stop it?",
    "options": [
      "ping --t <host>",
      "ping --q <host>",
      "ping --r <host>",
      "ping --s <host>"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "The ipconfig command will:",
    "options": [
      "Configure routers",
      "Display a client's address",
      "Display a client's broadcast mode",
      "Configure DHCP clients"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "You run the ipconfig command. The output is shown. From these settings, you can tell that the computer:",
    "options": [
      "Will have limited Internet access",
      "Will have full Internet access",
      "Will not be able to access the Internet",
      "Will not be able to access the local network"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "You have a computer with an address of 169.254.32.23 and a subnet mask of 255.255.0.0, yet you cannot connect to your local file servers. What is most likely the problem?",
    "options": [
      "it cannot communicate with a DHCP server",
      "the DNS servers specified are incorrect or are down",
      "NetBIOS over TCP/IP has not been enabled",
      "The network card is not connected properly to the network"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "A user reports that she cannot connect to network resources from a computer on the company network. The user was able to connect to the network resources yesterday. You verify that the user's computer is properly physically connected to the network. You discover that the computer's IP address is 169.254.48.97. You need to restore access to network resources. What should you do next?",
    "options": [
      "Flush the cache on the DNS server.",
      "Reset the user's password on the server.",
      "Check your router's current routing tables.",
      "Verify that the DHCP service is available."
    ],
    "correct": [3],
    "multiple": false
  },

  // 5.4 Given a scenario, use the appropriate Linux software tools to troubleshoot a problem
  {
    "question": "In Linux, which command-line tool should you use to list a host's active incoming connections?",
    "options": [
      "dig",
      "netstat",
      "ip addr",
      "host"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Which command shows all ports and incoming connections?",
    "options": [
      "netstat",
      "nslookup",
      "tracert"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "You are setting up a network computer game. You need to open up ports on your firewall so your friends can join the network. Which command displays the ports that your computer is listening for?",
    "options": [
      "nslookup",
      "nbtstat",
      "ping",
      "netstat"
    ],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "What command displays Ethernet statistics?",
    "options": [
      "netstat -e",
      "netstat -x",
      "netstat -q",
      "netstat --t"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Which command shows the hops or routers along a certain route?",
    "options": [
      "netstat",
      "nslookup",
      "tracert"
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The tracert command displays router addresses that are traversed between a source and a destination.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The tracert command determines packet loss between a source and a destination.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "For each of the following statements, select Yes if the statement is true. Otherwise, select No. The tracert command can display a list of routers being used for all active connections.",
    "options": [
      "Yes",
      "No"
    ],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Tracert is used to:",
    "options": [
      "Manage routing tables dynamically.",
      "Manage session-oriented connections between nodes.",
      "Report the route taken by packets across an IP network.",
      "Report the shortest route between different networks."
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Which command shows the public IP information for a certain domain name?",
    "options": [
      "netstat",
      "nslookup",
      "tracert"
    ],
    "correct": [1],
    "multiple": false
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALL_QUESTIONS;
}